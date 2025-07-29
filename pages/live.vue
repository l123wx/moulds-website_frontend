<template>
    <div class="container">
        <picture>
            <source media="(min-width: 769px)" :srcset="pcBackground" />
            <source media="(max-width: 768px)" :srcset="mobileBackground" />
            <img :src="pcBackground" alt="2023世界储能大会banner图片" />
        </picture>
        <div class="box">
            <VideoPlayer
                id="video"
                :sources="[
                    {
                        src: videoUrl
                    }
                ]"
                :poster="videoPoster"
                style="width: 100%"
                controls
                preload="auto"
            >
                <img class="placeholder" :src="videoPoster" />
            </VideoPlayer>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { VideoPlayer } from '@videojs-player/vue'
    import 'video.js/dist/video-js.css'

    import { videoUrl } from '~/public/config.js'

    import pcBackground from '~/assets/images/sign-in-background-pc.webp?url'
    import videoPoster from '~/assets/images/video-poster.jpg?url'
    import mobileBackground from '~/assets/images/sign-in-background-mobile.webp?url'

    definePageMeta({
        layout: 'empty'
    })
</script>

<style scoped lang="less">
    .container {
        background-color: #1958b4;
        height: 100vh;
        position: relative;

        img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .box {
        padding: 20px 30px;
        width: 50%;
        max-width: 800px;
        min-width: 500px;
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(318deg, #0042ff, #6addff);
        box-shadow: 0 2px 10px 0 transparent;
        padding: 10px;
    }

    @media screen and (max-width: @viewport-md) {
        .container {
            display: flex;
            flex-direction: column;

            img {
                height: auto;
                overflow: hidden;
                position: static;
            }
        }

        .box {
            flex: 1;
            max-width: unset;
            min-width: unset;
            width: 100%;
            position: static;
            transform: translate(0, 0);
            border-radius: 0;
        }
    }

    :deep(.video-js.v-video-player) {
        height: auto;
        width: 100%;
        img.placeholder {
            height: initial;
            position: relative;
            z-index: -1;
            opacity: 0;
        }
    }
</style>
