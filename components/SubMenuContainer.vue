<script setup lang="ts">
    import { type MenuItem } from '~/components/Layout/InfiniteMenu.vue'
    import InfiniteMenu from '~/components/Layout/InfiniteMenu.vue'

    defineProps<{
        activeMenuId?: string,
        subMenuTree: MenuItem,
        subMenuPending?: boolean
        hideSubMenuOnMobile?: boolean
    }>()
</script>

<template>
    <div class="sub-menu-layout-container">
        <div v-if="subMenuTree.children?.length" class="left-container" :class="{ 'hide-on-mobile': hideSubMenuOnMobile }">
            <div class="sub-menu-header">
                {{ subMenuTree.label }}
            </div>
            <el-skeleton :loading="subMenuPending" animated :throttle="{ leading: 500, trailing: 500 }">
                <template #default>
                    <InfiniteMenu
                        :default-active="activeMenuId"
                        :menu-list="subMenuTree.children || []"
                        :default-openeds="activeMenuId ? [activeMenuId] : []"
                        unique-opened
                        class="sub-menu"
                    />
                </template>
                <template #template>
                    <el-skeleton-item v-for="i in 5" :key="i" variant="p" style="width: 100%; height: 30px; margin-top: 10px" />
                </template>
            </el-skeleton>
        </div>
        <div class="right-container">
            <slot name="breadcrumb" />
            <div class="main-content">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .sub-menu-layout-container {
        padding-top: 40px;
        margin: 0 auto 50px;
        width: 90%;
        max-width: @page-content-max-width;
        display: flex;
        row-gap: 20px;
        column-gap: 3%;
        min-height: calc(100vh - var(--header-height) - 100vh/5);

        @media screen and (max-width: @viewport-md) {
            flex-direction: column-reverse;
        }

        .left-container {
            flex: 0 0 22.25%;

            .sub-menu-header {
                background-color: rgba(238, 238, 238, 1);
                padding: 20px 15px 20px 25px;
                color: rgba(0, 77, 255, 1);
                font-size: 18px;
                font-weight: bold;
                border-top-left-radius: 20px;
            }

            .sub-menu {
                border-right: none;
            }

            &.hide-on-mobile {
                @media screen and (max-width: @viewport-md) {
                    display: none;
                }
            }
        }
        .right-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }
</style>
