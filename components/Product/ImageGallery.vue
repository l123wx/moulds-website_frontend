<template>
    <div class="product-gallery">
        <!-- 大图展示区 -->
        <div
            ref="mainImageRef"
            class="main-image"
            @mousemove="delegateMouseMove"
            @mouseenter="delegateMouseEnter"
            @mouseleave="delegateMouseLeave"
            @touchstart="delegateTouchStart"
            @touchmove="delegateTouchMove"
            @touchend="delegateTouchEnd">
            <el-carousel
                ref="carouselRef"
                height="300px"
                :initial-index="activeIndex"
                :autoplay="false"
                :arrow="isMobile ? 'always' : 'hover'"
                indicator-position="none"
                @change="handleSlideChange">
                <el-carousel-item v-for="(banner, index) in bannerList" :key="index">
                    <div
                        ref="imageContainerRef"
                        class="banner-item-container"
                        :style="banner.type === 'image' ? 'cursor: crosshair;' : ''"
                    >
                        <template v-if="banner.type === 'image'">
                            <NuxtImg
                                ref="imageRef"
                                :src="banner.src"
                                loading="lazy"
                                class="product-image"
                                @load="handleImageLoad"
                            />

                            <!-- 放大镜镜头 -->
                            <div
                                v-if="canShowMagnifier"
                                class="magnifying-lens"
                                :style="lensStyle"
                            >
                                <div
                                    v-if="isMobile"
                                    class="mobile magnifying-glass"
                                    :style="magnifyingGlassStyle"
                                >
                                    <NuxtImg
                                        v-if="currentZoomImage"
                                        :src="currentZoomImage.src"
                                        class="magnified-image"
                                        :style="magnifiedImageStyle"
                                        loading="eager"
                                    />
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <video
                                :src="banner.src"
                                class="product-video"
                                controls
                            />
                        </template>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>

        <!-- 缩略图导航 -->
        <div class="thumbnail-nav">
            <div
                v-for="(banner, index) in bannerList"
                :key="`thumb-${index}`"
                class="thumbnail-item"
                :class="{ active: index === activeIndex }"
                @click="setActiveImage(index)"
            >
                <NuxtImg
                    v-if="banner.type === 'image'"
                    :src="banner.src"
                    loading="lazy"
                    class="thumbnail-image"
                />
                <div v-else class="thumbnail-video">
                    <video :src="banner.src" />
                    <img class="play-icon" src="~/assets/images/play-icon.png" />
                </div>
            </div>
        </div>

        <!-- 放大结果显示区域 -->
        <div
            v-if="canShowMagnifier && !isMobile"
            class="magnifying-glass"
            :style="magnifyingGlassStyle"
        >
            <NuxtImg
                v-if="currentZoomImage"
                :src="currentZoomImage.src"
                class="magnified-image"
                :style="magnifiedImageStyle"
                loading="eager"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
    import { VideoPlay } from '@element-plus/icons-vue'

    const props = defineProps<{
        bannerList: {
            src: string;
            type: 'video' | 'image';
        }[];
    }>()

    // 轮播图播放间隔
    const CAROUSEL_PLAYING_INTERVAL = 400

    // 组件引用
    const activeIndex = ref(0)
    const carouselRef = ref()
    const mainImageRef = ref<HTMLElement>()
    const imageContainerRef = ref<HTMLElement[]>([])
    const imageRef = ref<HTMLImageElement>()

    const isCarouselPlaying = ref(false)

    // 设备类型检测
    const isMobile = ref(false)

    // 放大镜状态
    const isMagnifying = ref(false)
    const isImageLoaded = ref(false)

    // 鼠标/触摸位置
    const mousePosition = reactive({ x: 0, y: 0 })
    const lastMousePosition = reactive({ x: 0, y: 0 })
    const imageRect = reactive({ width: 0, height: 0, left: 0, top: 0 })
    const moveThreshold = 0.005 // 相对移动距离阈值(0-1之间)
    const currentContainerRect = reactive({ width: 0, height: 0, left: 0, top: 0 }) // 当前容器的边界矩形
    const client = { x: 0, y: 0 }
    let isEnter = false

    // 放大镜配置
    const magnifierConfig = reactive({
        zoomFactor: 2.5, // 放大倍数
        lensSize: 150, // 镜头尺寸
        glassSize: 300, // 放大镜显示区域尺寸
        borderWidth: 2, // 边框宽度
        offsetX: 20, // X轴偏移
        offsetY: 0 // Y轴偏移
    })

    const isCurrentTypeImage = computed(() => props.bannerList[activeIndex.value]?.type === 'image')

    // 计算当前放大的图片
    const currentZoomImage = computed(() => {
        return props.bannerList[activeIndex.value] || { src: '' }
    })

    // 检查是否可以显示放大镜元素
    const canShowMagnifier = computed(() => {
        return isMagnifying.value && imageContainerRef.value?.[activeIndex.value] && isCurrentTypeImage.value
    })

    // 镜头样式
    const lensStyle = computed(() => {
        if (!canShowMagnifier.value) {
            return { display: 'none' }
        }

        const lensSize = magnifierConfig.lensSize
        const halfLens = lensSize / 2

        // 根据缓存的容器尺寸计算镜头位置
        const x = mousePosition.x * currentContainerRect.width - halfLens
        const y = mousePosition.y * currentContainerRect.height - halfLens

        // 边界限制
        const boundedX = Math.max(0, Math.min(currentContainerRect.width - lensSize, x))
        const boundedY = Math.max(0, Math.min(currentContainerRect.height - lensSize, y))

        return {
            left: `${boundedX}px`,
            top: `${boundedY}px`,
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            border: `${magnifierConfig.borderWidth}px solid #ffffff`
        }
    })

    // 放大镜容器样式
    const magnifyingGlassStyle = computed(() => {
        if (!canShowMagnifier.value || !mainImageRef.value) {
            return { display: 'none' }
        }

        const glassSize = isMobile.value ? magnifierConfig.lensSize : magnifierConfig.glassSize
        const rect = mainImageRef.value.getBoundingClientRect()

        if (isMobile.value) {
            return {
                width: `${glassSize}px`,
                height: `${glassSize}px`
            }
        }

        return {
            width: `${glassSize}px`,
            height: `${glassSize}px`,
            border: `${magnifierConfig.borderWidth}px solid #e5e5e5`,
            left: `${rect.right + magnifierConfig.offsetX}px`,
            top: `${rect.top + magnifierConfig.offsetY}px`
        }
    })

    // 放大图片样式
    const magnifiedImageStyle = computed(() => {
        if (!canShowMagnifier.value) {
            return {}
        }

        const glassSize = isMobile.value ? magnifierConfig.lensSize : magnifierConfig.glassSize
        const zoomFactor = magnifierConfig.zoomFactor

        // 计算图片在放大镜中的位置
        const imageWidth = currentContainerRect.width * zoomFactor
        const imageHeight = currentContainerRect.height * zoomFactor

        // 计算偏移，使鼠标点居中
        const offsetX = -(mousePosition.x * imageWidth - glassSize / 2)
        const offsetY = -(mousePosition.y * imageHeight - glassSize / 2)

        return {
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
            transform: `translate(${offsetX}px, ${offsetY}px)`,
            objectFit: 'contain' as const,
            userSelect: 'none' as const,
            pointerEvents: 'none' as const
        }
    })

    // 生命周期
    onMounted(() => {
        checkDeviceType()
        window.addEventListener('resize', checkDeviceType)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', checkDeviceType)
    })

    // 检查设备类型
    const checkDeviceType = () => {
        isMobile.value = window.innerWidth <= 768
    }

    // 图片加载处理
    const handleImageLoad = () => {
        isImageLoaded.value = true
        updateImageRect()
    }

    // 更新图片尺寸信息
    const updateImageRect = () => {
        const targetContainer = imageContainerRef.value?.[activeIndex.value]
        if (!targetContainer) {
            return
        }

        const rect = targetContainer.getBoundingClientRect()
        imageRect.width = rect.width
        imageRect.height = rect.height
        imageRect.left = rect.left
        imageRect.top = rect.top
    }

    // 辅助函数：重置容器边界矩形缓存
    const resetContainerRect = () => {
        currentContainerRect.width = 0
        currentContainerRect.height = 0
        currentContainerRect.left = 0
        currentContainerRect.top = 0
    }
    // 辅助函数：缓存容器边界矩形
    const cacheContainerRect = () => {
        const targetContainer = imageContainerRef.value?.[activeIndex.value]
        if (!targetContainer) {
            return
        }

        const rect = targetContainer.getBoundingClientRect()
        currentContainerRect.width = rect.width
        currentContainerRect.height = rect.height
        currentContainerRect.left = rect.left
        currentContainerRect.top = rect.top
    }
    // 辅助函数：初始化位置
    const initPosition = () => {
        const initialX = Math.max(0, Math.min(1, (client.x - currentContainerRect.left) / currentContainerRect.width))
        const initialY = Math.max(0, Math.min(1, (client.y - currentContainerRect.top) / currentContainerRect.height))
        lastMousePosition.x = initialX
        lastMousePosition.y = initialY
        mousePosition.x = initialX
        mousePosition.y = initialY
    }

    // 辅助函数：初始化交互（鼠标/触摸）
    const initInteraction = () => {
        updateImageRect()
        cacheContainerRect()
        initPosition()
    }

    const saveClientPosition = (event: MouseEvent | TouchEvent['touches'][number]) => {
        client.x = event.clientX
        client.y = event.clientY
    }

    watch(isCarouselPlaying, newVal => {
        if (!newVal) {
            isEnter && (isMagnifying.value = true)
            initInteraction()
        }
    })

    const delegateMouseEnter = (event: MouseEvent) => {
        if (isMobile.value) { return }

        isEnter = true

        if (!isCurrentTypeImage.value) { return }
        handleMouseEnter(event)
    }

    // 鼠标事件代理
    const delegateMouseMove = (event: MouseEvent) => {
        if (isMobile.value || !isCurrentTypeImage.value) {
            return
        }

        handleMouseMove(event)
    }

    const delegateMouseLeave = (event: MouseEvent) => {
        if (isMobile.value) { return }

        isEnter = false

        if (!isCurrentTypeImage.value) { return }

        // 只有当鼠标真正离开整个容器时才触发
        if (!event.relatedTarget || !findBannerItemContainer(event.relatedTarget)) {
            handleMouseLeave()
        }
    }

    // 触摸事件代理
    const delegateTouchStart = (event: TouchEvent) => {
        if (isMobile.value) {
            return
        }

        isEnter = true

        if (!isCurrentTypeImage.value) { return }

        // 如果点击的是轮播图的箭头，则不触发放大镜
        if (findParentElementByClassName(event.target, 'el-carousel__arrow')) { return }

        const container = findBannerItemContainer(event.target)
        if (container) {
            // 由于不能直接创建带有完整属性的新 TouchEvent，我们直接使用原事件
            // 并在原处理函数中处理容器获取
            handleTouchStart(event)
        }
    }

    const delegateTouchMove = (event: TouchEvent) => {
        if (isMobile.value || !isCurrentTypeImage.value) {
            return
        }

        const container = findBannerItemContainer(event.target)
        if (container) {
            handleTouchMove(event)
        }
    }

    const delegateTouchEnd = (event: TouchEvent) => {
        if (isMobile.value) { return }

        isEnter = false

        if (!isCurrentTypeImage.value) { return }

        const container = findBannerItemContainer(event.target)
        if (container) {
            handleTouchEnd()
        }
    }

    // 鼠标事件处理
    const handleMouseEnter = (event: MouseEvent) => {
        saveClientPosition(event)

        if (!isCarouselPlaying.value) {
            isMagnifying.value = true
            initInteraction()
        }
    }

    const handleMouseMove = (event: MouseEvent) => {
        saveClientPosition(event)
        isMagnifying.value && updateMousePosition()
    }

    const handleMouseLeave = () => {
        isMagnifying.value = false
        // 重置容器尺寸缓存
        resetContainerRect()
    }

    // 触摸事件处理
    const handleTouchStart = (event: TouchEvent) => {
        event.preventDefault()

        const touch = event.touches[0]
        if (touch) {
            saveClientPosition(touch)

            if (!isCarouselPlaying.value) {
                isMagnifying.value = true
                initInteraction()
            }
        }
    }

    const handleTouchMove = (event: TouchEvent) => {
        event.preventDefault()

        const touch = event.touches[0]
        if (touch) {
            saveClientPosition(touch)

            isMagnifying.value && updateMousePosition()
        }
    }

    const handleTouchEnd = () => {
        setTimeout(() => {
            isMagnifying.value = false
            // 重置容器尺寸缓存
            resetContainerRect()
        }, 100)
    }

    // 更新鼠标位置
    const updateMousePosition = () => {
        // 只在初始化时更新容器尺寸
        if (!currentContainerRect.width || !currentContainerRect.height) {
            cacheContainerRect()
        }

        // 使用缓存的容器边界计算新的相对位置
        const newX = Math.max(0, Math.min(1, (client.x - currentContainerRect.left) / currentContainerRect.width))
        const newY = Math.max(0, Math.min(1, (client.y - currentContainerRect.top) / currentContainerRect.height))

        // 计算与上次位置的距离
        const distanceSquared = Math.pow(newX - lastMousePosition.x, 2) + Math.pow(newY - lastMousePosition.y, 2)

        // 只有当移动距离超过阈值时才更新位置
        if (distanceSquared > moveThreshold * moveThreshold) {
            // 保存当前位置作为上次位置
            lastMousePosition.x = newX
            lastMousePosition.y = newY

            // 更新当前位置
            mousePosition.x = newX
            mousePosition.y = newY
        }
    }

    // 事件代理函数
    const findBannerItemContainer = (target: EventTarget | null): HTMLElement | null => {
        return findParentElementByClassName(target, 'banner-item-container')
    }

    const findParentElementByClassName = (target: EventTarget | null, className: string): HTMLElement | null => {
        if (!target || !(target instanceof Element)) { return null }

        if (target.classList.contains(className)) {
            return target as HTMLElement
        }

        // 向上查找父元素
        let element: Element | null = target.parentElement
        while (element) {
            if (element.classList.contains(className)) {
                return element as HTMLElement
            }
            element = element.parentElement
        }

        return null
    }

    // 轮播图处理
    let timeout: NodeJS.Timeout | null = null
    const handleSlideChange = (index: number) => {
        activeIndex.value = index
        // 切换图片时重置放大镜状态
        nextTick(() => {
            isImageLoaded.value = false
            isMagnifying.value = false
            // 重置容器尺寸缓存
            resetContainerRect()
            // 确保轮播图切换后容器引用是最新的
            updateImageRect()
        })

        isCarouselPlaying.value = true
        timeout && clearTimeout(timeout)
        timeout = setTimeout(() => {
            isCarouselPlaying.value = false
        }, CAROUSEL_PLAYING_INTERVAL)
    }

    const setActiveImage = (index: number) => {
        activeIndex.value = index
        if (carouselRef.value) {
            carouselRef.value.setActiveItem(index)
        }
    }
</script>

<style scoped lang="less">
.product-gallery {
    width: 100%;
    position: relative;

    .main-image {
        width: 100%;
        margin-bottom: 15px;
        border: 1px solid #EBEBEB;
        position: relative;

        .banner-item-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;

            // 鼠标悬停时的视觉反馈
            &:hover {
                .product-image {
                    transition: opacity 0.2s ease;
                }
            }
        }

        .product-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: opacity 0.2s ease;
        }

        // 放大镜镜头
        .magnifying-lens {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            pointer-events: none;
            z-index: 10;
            transition: opacity 0.2s ease;
            overflow: hidden;

            // 添加一个内部边框效果
            &::after {
                content: '';
                position: absolute;
                top: 2px;
                left: 2px;
                right: 2px;
                bottom: 2px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 50%;
            }
        }

        .product-video {
            max-width: 100%;
            max-height: 100%;
        }
    }

    // 放大镜显示区域
    .magnifying-glass {
        position: fixed;
        border-radius: 8px;
        background-color: #ffffff;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        overflow: hidden;
        z-index: 1000;
        pointer-events: none;

        // 添加渐入动画
        animation: magnifyFadeIn 0.2s ease-out;

        .magnified-image {
            object-fit: contain;
            user-select: none;
            pointer-events: none;
            transition: transform 0.1s ease-out;
        }

        &.mobile {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }

    // 放大镜渐入动画
    @keyframes magnifyFadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    // Element Plus 轮播图样式覆盖
    :deep(.el-carousel__indicators--outside) {
        margin-top: 10px;
    }

    :deep(.el-carousel__button) {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #dcdcdc;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #004DFF;
        }
    }

    :deep(.el-carousel__indicator.is-active .el-carousel__button) {
        background-color: #004DFF;
    }

    // 缩略图导航
    .thumbnail-nav {
        display: flex;
        flex-wrap: nowrap;
        gap: 10px;
        padding-top: 10px;
        overflow-x: auto;
        padding-bottom: 5px;

        &::-webkit-scrollbar {
            height: 4px;
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 2px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        .thumbnail-item {
            flex: 0 0 50px;
            height: 50px;
            border: 1px solid #EBEBEB;
            cursor: pointer;
            padding: 2px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            border-radius: 4px;

            &.active {
                border-color: #004DFF;
                box-shadow: 0 0 8px rgba(0, 77, 255, 0.2);
            }

            &:hover {
                border-color: #004DFF;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .thumbnail-image {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }

            .thumbnail-video {
                width: 100%;
                height: 100%;
                position: relative;

                video {
                    max-width: 100%;
                    max-height: 100%;
                }

                .play-icon {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #fff;
                    width: 25px;
                    height: 25px;
                }
            }
        }
    }
}

// 平板设备响应式设计
@media screen and (max-width: @viewport-md) {
    .product-gallery {
        .main-image {
            :deep(.el-carousel__container) {
                height: 300px !important;
            }
        }

        .thumbnail-nav {
            .thumbnail-item {
                flex: 0 0 60px;
                height: 60px;
            }
        }
    }
}

// 手机设备响应式设计
@media screen and (max-width: @viewport-sm) {
    .product-gallery {
        .main-image {
            :deep(.el-carousel__container) {
                height: 250px !important;
            }

            .banner-item-container {
                // 移动端触摸反馈
                &:active {
                    .product-image {
                        opacity: 0.9;
                    }
                }
            }
        }
    }
}
</style>
