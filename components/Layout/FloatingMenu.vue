<script setup lang="ts">
    import gsap from 'gsap'
    import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
    import getAllFloatingMenu from '~/http/apis/getAllFloatingMenu'

    const { data: list, error } = useAsyncData(() => getAllFloatingMenu(), {
        transform: data => data.data,
        default: () => []
    })

    const handleBackTopClick = () => {
        gsap.to(document.querySelector('html'), { duration: 0.5, ease: 'easeInOutCubic', scrollTop: 0 })
    }

    const handleBackBottomClick = () => {
        gsap.to(document.querySelector('html'), { duration: 0.5, ease: 'easeInOutCubic', scrollTop: document.documentElement.scrollHeight - document.documentElement.clientHeight })
    }
</script>

<template>
    <div class="floating-menu-container">
        <el-button class="back-top" :icon="ArrowUp" @click="handleBackTopClick">
        </el-button>
        <template v-if="!error && list.length > 0">
            <div v-for="menu in list" :key="menu.id" class="menu-item">
                <NuxtImg loading="lazy" :src="menu.imagePath" />
                <div class="link">
                    <NuxtLinkLocale
                        v-if="menu.linkType === '0'"
                        :to="menu.link || ''"
                        :target="menu.openType === '1' ? '_blank' : '_self'"
                        class="nav-link"
                    >
                        {{ menu.label }}
                    </NuxtLinkLocale>
                    <NuxtLink
                        v-else
                        :to="menu.link || ''"
                        :target="menu.openType === '1' ? '_blank' : '_self'"
                        class="nav-link"
                    >
                        {{ menu.label }}
                    </NuxtLink>
                </div>
            </div>
        </template>
        <el-button class="back-bottom" :icon="ArrowDown" @click="handleBackBottomClick">
        </el-button>
    </div>
</template>

<style scoped lang="less">
    .floating-menu-container {
        --item-width: 45px;
        --item-height: 45px;

        position: fixed;
        right: 0;
        bottom: 30%;
        z-index: 1000;

        display: flex;
        flex-direction: column;
        background: #004dff;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        transition: all ease .3s;

        > :deep(.el-button) {
            height: var(--item-height);
            color: #fff;
            background-color: #004dff;
            border-radius: 0;
            border: none;
            padding: 0;
            margin: 0;
            width: var(--item-width);
            font-size: 20px;

            &:hover {
                background-color: #1f3a9d;
            }
        }

        .menu-item {
            height: var(--item-height);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            img {
                width: 60%;
                height: 60%;
                object-fit: cover;
            }

            .link {
                position: absolute;
                right: 100%;
                top: 50%;
                transform: translateY(-50%);
                background-color: #fff;
                font-weight: 500;
                transition: all ease .3s;
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: nowrap;

                min-width: 160px;
                min-height: 70px;
                box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
                padding: 5px 20px;
                z-index: 2;
                opacity: 0;
                pointer-events: none;

                a {
                    font-size: 16px;
                    color: #004dff;

                    &:hover {
                        opacity: 0.6;
                    }
                }
            }

            &:hover {
                .link {
                    opacity: 1;
                    pointer-events: auto;
                }
            }
        }
    }

     // 响应式设计
     @media screen and (max-width: @viewport-md) {
        .floating-menu-container {
            --item-width: 35px;
            --item-height: 35px;
        }
     }
</style>
