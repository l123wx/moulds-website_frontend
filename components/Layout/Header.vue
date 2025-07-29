<template>
    <div class="header-container">
        <picture>
            <source media="(min-width: 769px)" :srcset="pcBannerImg" />
            <source media="(max-width: 768px)" :srcset="mobileBannerImg" />
            <img :src="pcBannerImg" alt="2023世界储能大会banner图片" />
        </picture>
        <Nav />
    </div>
</template>

<script setup lang="ts">
    import Nav from './Nav.vue'
    import pcBannerImg from '~/assets/images/banner-pc.webp?url'
    import mobileBannerImg from '~/assets/images/banner-mobile.webp?url'
</script>

<style scoped lang="less">
    .header-container {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 1000;

        height: var(--header-height);
        box-sizing: border-box;

        padding: 0 40px;
        box-shadow: none;
        transition: box-shadow 0.2s, background-color 0.3s;

        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;

        overflow: hidden;

        @media screen and (max-width: @viewport-md) {
            padding: 0 20px;
            justify-content: flex-start;
        }

        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            min-height: 500px;
            object-fit: cover;
            object-position: center top;
            pointer-events: none;
        }
    }
</style>
