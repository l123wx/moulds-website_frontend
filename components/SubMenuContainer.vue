<script setup lang="ts">
    import { ArrowRight } from '@element-plus/icons-vue'
    import { type MenuItem } from '~/components/Layout/InfiniteMenu.vue'
    import InfiniteMenu from '~/components/Layout/InfiniteMenu.vue'

    type BreadcrumbItem = {
        label: string,
        link?: string,
    }

    defineProps<{
        activeMenuId?: string,
        subMenuTree: MenuItem,
        subMenuPending?: boolean,
        breadcrumbList: BreadcrumbItem[],
        breadcrumbPending?: boolean,
    }>()

    const localePath = useLocalePath()
</script>

<template>
    <div class="sub-menu-layout-container">
        <div class="left-container">
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
            <div class="breadcrumb-container">
                <div class="loading-container">
                    <el-skeleton :loading="breadcrumbPending" :throttle="{ leading: 500, trailing: 500 }" animated :title="false">
                        <template #template>
                            <el-skeleton-item variant="p" style="width: 50%" />
                        </template>
                        <template #default>
                            <el-breadcrumb :separator-icon="ArrowRight">
                                <el-breadcrumb-item :to="localePath('/')">{{ $t('home') }}</el-breadcrumb-item>
                                <el-breadcrumb-item
                                    v-for="breadcrumb in breadcrumbList"
                                    :key="breadcrumb.label"
                                    :to="breadcrumb.link ? localePath(breadcrumb.link) : undefined"
                                >
                                    {{ breadcrumb.label }}
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </template>
                    </el-skeleton>
                </div>
            </div>
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
        }
        .right-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding-top: 5px;
        }
    }

    .breadcrumb-container {}
</style>
