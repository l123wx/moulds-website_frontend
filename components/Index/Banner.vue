<template>
    <div class="banner">
        <div v-if="error">{{ $t('http.error') }}</div>
        <UCarousel
            v-slot="{ item: banner, index }" arrows dots :items="bannerList" :ui="{
                dots: 'bottom-0',
                dot: 'w-[10px] h-[10px] !bg-[#999] opacity-20 data-[state=active]:opacity-100',
                arrows: 'absolute top-[50%] translate-y-[-50%] z-10 w-full',
                prev: '!start-4',
                next: '!end-4'
            }">
            <Link
                v-if="banner.link" :to="banner.link" :link-type="banner.linkType" :open-type="banner.openType"
                class="banner-link">
                <NuxtImg
                    loading="lazy" fetch-priority="high" :placeholder="[300, 100, 100]" :preload="index === 0"
                    format="webp" :src="banner.imagePath" :alt="$t('Banner Image')" class="banner-image"
                    @load="handleImageLoad" />
            </Link>
            <NuxtImg
                v-else loading="lazy" fetch-priority="high" :placeholder="[300, 100, 100]" :preload="index === 0"
                format="webp" :src="banner.imagePath" :alt="$t('Banner Image')" class="banner-image"
                @load="handleImageLoad" />
        </UCarousel>
    </div>
</template>

<script setup lang="ts">
    import type { ElCarousel } from 'element-plus'
    import getBanners, { type Banner } from '~/http/apis/getBanners'
    import Link from '~/components/Link.vue'

    const { locale } = useI18n()

    const carouselRef = ref<InstanceType<typeof ElCarousel>>()

    const { data: bannerList, error } = useAsyncData(() => getBanners(locale.value), {
        transform: data => data?.data,
        default: () => [] as Banner[]
    })

    const handleImageLoad = () => {
        carouselRef.value?.$forceUpdate()
    }
</script>

<style scoped lang="less">
.banner {
    width: 100%;
}

.banner-image {
    width: 100%;
    object-fit: cover;
    display: block;
    margin: 0 auto;
}
</style>
