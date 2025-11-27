<template>
    <div class="banner">
        <div v-if="error">{{ $t('http.error') }}</div>
        <UCarousel
            ref="carouselRef"
            v-slot="{ item: banner, index }"
            :autoplay="isMounted ? { delay: 5000 } : false" loop arrows indicators
            :items="bannerList"
            :ui="{
                arrows: {
                    wrapper: 'absolute top-[50%] translate-y-[-50%] z-10 w-full'
                },
                prev: '!start-4',
                next: '!end-4',
                item: 'w-full',
                indicators: {
                    wrapper: 'bottom-0',
                    base: 'w-[10px] h-[10px] !bg-[#999]',
                    active: 'opacity-100',
                    inactive: 'opacity-20'
                },
            }"
            :prev-button="{
                color: 'gray'
            }"
            :next-button="{
                color: 'gray'
            }"
        >
            <Link
                v-if="banner.link" :to="banner.link" :link-type="banner.linkType" :open-type="banner.openType"
                class="banner-link w-full">
                <NuxtImg
                    :preload="index === 0" :loading="index === 0 ? 'eager' : 'lazy'"
                    width="1920"
                    height="630"
                    format="webp" :src="banner.imagePath" :alt="$t('Banner Image')" class="banner-image"
                />
            </Link>
            <NuxtImg
                v-else :preload="index === 0" :loading="index === 0 ? 'eager' : 'lazy'"
                format="webp" :src="banner.imagePath" :alt="$t('Banner Image')" class="banner-image"
            />
        </UCarousel>
    </div>
</template>

<script setup lang="ts">
    import { useMounted } from '@vueuse/core'
    import getBanners, { type Banner } from '~/http/apis/getBanners'
    import Link from '~/components/Link.vue'

    const { locale } = useI18n()
    const isMounted = useMounted()

    const carouselRef = ref()
    onMounted(() => {
        setInterval(() => {
            if (!carouselRef.value) { return }

            if (carouselRef.value.page === carouselRef.value.pages) {
                return carouselRef.value.select(0)
            }

            carouselRef.value.next()
        }, 5000)
    })

    const { data: bannerList, error } = useAsyncData(() => getBanners(locale.value), {
        transform: data => data?.data,
        default: () => [] as Banner[]
    })
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
