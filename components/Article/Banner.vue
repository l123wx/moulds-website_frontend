<template>
    <div class="banner">
        <NuxtImg
            provider="twicpics"
            :src="bannerImage"
            placeholder
            loading="lazy"
            alt="article-banner"
        />
        <div v-if="zh && en" class="text">
            <div class="zh">{{ zh }}</div>
            <div class="en">{{ en }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import bannerImage from '~/assets/images/article-banner.webp?url'

    defineProps<{
        zh?: string
        en?: string
    }>()
</script>

<style scoped lang="less">
    .banner {
        position: relative;
        > img {
            height: 350px;
            width: 100%;
            object-fit: cover;
            @media screen and (max-width: @viewport-md) {
                height: 200px;
            }
        }
        margin-top: var(--header-height);
        .text {
            font-family: '字魂扁桃体';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -55%);
            color: #ffffff;
            text-align: center;
            .zh {
                font-size: 60px;
            }
            .en {
                font-size: 24px;
                text-transform: uppercase;
                letter-spacing: 10px;
            }
            @media screen and (max-width: @viewport-md) {
                .zh {
                    font-size: 44px;
                }
                .en {
                    font-size: 16px;
                }
            }
        }
    }
</style>
