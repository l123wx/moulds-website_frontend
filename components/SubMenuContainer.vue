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
        <div class="left-container" :class="{ 'hide-on-mobile': hideSubMenuOnMobile }">
            <div class="sub-menu-header">
                {{ subMenuTree.label }}
            </div>
            <el-skeleton :loading="subMenuPending" :rows="5" animated :title="false">
                <template #default>
                    <InfiniteMenu
                        :default-active="activeMenuId"
                        :menu-list="subMenuTree.children || []"
                        class="sub-menu"
                    />
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
        max-width: 1600px;
        display: flex;
        row-gap: 20px;
        column-gap: 3%;

        @media screen and (max-width: @viewport-md) {
            flex-direction: column;
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
