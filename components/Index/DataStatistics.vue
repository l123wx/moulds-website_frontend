<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    import getDataStatistics from '~/http/apis/getDataStatistics'

    // 注册ScrollTrigger插件
    gsap.registerPlugin(ScrollTrigger)

    const { locale } = useI18n()

    // 定义统计数据
    const stats = ref<{
        activeNumber: number
        startNumber: number
        endNumber: number
        text: string
        suffix: string
    }[]>([])

    // 数字动画初始化标志
    const animationInitialized = ref(false)

    // 获取数据统计信息
    const { data: statisticsData, pending, error } = await useAsyncData(
        'dataStatistics',
        () => getDataStatistics(locale.value),
        {
            watch: [locale],
            transform: (result) => result.data
        }
    )

    // 监听数据变化并更新统计数据
    watch(statisticsData, (newData) => {
        if (newData) {
            stats.value = newData.map(item => ({
                activeNumber: 0,
                startNumber: 0,
                endNumber: item.value,
                text: item.label,
                suffix: item.suffix
            }))
            // 重置动画状态
            animationInitialized.value = false
            // 重新初始化动画
            nextTick(() => {
                initNumberAnimation()
            })
        }
    }, { immediate: true })

    // 初始化数字滚动动画
    const initNumberAnimation = () => {
        if (animationInitialized.value) {
            return
        }

        stats.value.forEach((stat) => {
            stat.activeNumber = stat.startNumber

            gsap.to(stat, {
                activeNumber: stat.endNumber,
                duration: 2,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: '.stats-container',
                    start: 'top bottom',
                    onEnter: () => {
                        animationInitialized.value = true
                    }
                }
            })
        })
    }

    onMounted(() => {
        initNumberAnimation()
    })
</script>

<template>
    <div class="stats-container">
        <div v-if="pending" class="stats-loading">
            <el-skeleton animated>
                <template #template>
                    <el-skeleton-item variant="p" />
                    <el-skeleton-item variant="p" style="margin-top: 10px" />
                </template>
            </el-skeleton>
        </div>
        <div v-else-if="error" class="stats-error">
            <el-alert
                type="error"
                :title="error.message"
                show-icon
            />
        </div>
        <div v-else class="stats-wrapper">
            <div
                v-for="(stat, index) in stats"
                :key="index"
                class="stat-item"
            >
                <div class="stat-content">
                    <div class="stat-number">
                        {{ Math.floor(stat.activeNumber) }}
                        <span class="suffix">
                            {{ stat.suffix }}
                        </span>
                    </div>
                    <div class="stat-text">{{ stat.text }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.stats-container {
    max-width: @page-content-max-width;
    margin: 80px auto;
    padding: 0 30px;

    .stats-loading,
    .stats-error {
        padding: 20px;
    }

    @media screen and (max-width: @viewport-md) {
        margin: 50px auto;
        padding: 0 18px;
    }
}

.stats-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media screen and (max-width: @viewport-md) {
        flex-wrap: wrap;
        gap: 30px;
    }
}

.stat-item {
    display: flex;
    justify-content: center;

    @media screen and (max-width: @viewport-md) {
        flex: 0 0 calc(50% - 15px);
    }
}

.stat-content {
    display: flex;
    align-items: start;
    gap: 10px;

    @media screen and (max-width: @viewport-md) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
}

.stat-number {
    font-size: 50px;
    color: @main-color;
    display: flex;
    align-items: end;

    .suffix {
        font-size: 18px;
    }

    @media screen and (max-width: @viewport-md) {
        font-size: 30px;
    }
}

.stat-text {
    font-size: 16px;
    color: #666666;
    min-height: 100%;
    display: flex;
    align-items: center;
    white-space: break-spaces;

    @media screen and (max-width: @viewport-md) {
        font-size: 14px;
        min-height: initial;
    }
}
</style>
