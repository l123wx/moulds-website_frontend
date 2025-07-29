<template>
    <div>
        <div class="banner">
            <picture>
                <source media="(min-width: 769px)" :srcset="pcBannerImg" />
                <source media="(max-width: 768px)" :srcset="mobileBannerImg" />
                <img :src="pcBannerImg" alt="2023世界储能大会banner图片" />
            </picture>
        </div>
        <News />
        <Schedule />
        <Forum />
    </div>
</template>

<script setup lang="ts">
    import pcBannerImg from '~/assets/images/banner-pc.webp?url'
    import mobileBannerImg from '~/assets/images/banner-mobile.webp?url'
    import News from '~/components/Index/News.vue'
    import Schedule from '~/components/Index/Schedule.vue'
    import Forum from '~/components/Index/Forum.vue'
</script>

<style scoped lang="less">
    .banner img {
        width: 100%;
        min-height: 500px;
        object-fit: cover;
        object-position: center top;
    }
</style>
