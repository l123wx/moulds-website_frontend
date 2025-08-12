<template>
    <div class="banner">
        <div v-if="error">{{ $t('http.error') }}</div>
        <el-carousel v-else ref="carouselRef" height="auto" :interval="3000" trigger="click">
            <el-carousel-item v-for="(banner, index) in bannerList" :key="index">
                <Link v-if="banner.link" :to="banner.link" :link-type="banner.linkType" :open-type="banner.openType" class="banner-link">
                    <NuxtImg loading="lazy" :src="banner.imagePath" :alt="$t('Banner Image')" class="banner-image" @load="handleImageLoad" />
                </Link>
                <NuxtImg v-else loading="lazy" :src="banner.imagePath" :alt="$t('Banner Image')" class="banner-image" @load="handleImageLoad" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup lang="ts">
    import type { ElCarousel } from 'element-plus'
    import getBanners from '~/http/apis/getBanners'
    import Link from '~/components/Link.vue'

    const carouselRef = ref<InstanceType<typeof ElCarousel>>()

    const { data: bannerList, error } = useAsyncData(() => getBanners(), {
        transform: data => data?.data,
        default: () => []
    })

    const handleImageLoad = () => {
        carouselRef.value?.$forceUpdate()
    }
</script>

<style scoped lang="less">
.banner {
    width: 100%;
    overflow: hidden;
}

.banner-image {
    width: 100%;
    object-fit: cover;
    display: block;
    margin: 0 auto;
}

:deep(.el-carousel__item) {
    height: fit-content;
    max-height: calc(100vh - var(--header-height) - 20%);
}

:deep(.el-carousel__indicators) {
    z-index: 10;
    bottom: -14px;
}

:deep(.el-carousel__button) {
    height: 10px;
    width: 10px;
    background-color: #999;
    border-radius: 50%;
}
</style>
