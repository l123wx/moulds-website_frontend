<template>
    <div class="mobile">
        <el-icon
            class="el-icon--right"
            style="font-size: 22px; cursor: pointer"
            @click="drawerVisible = true"
        >
            <MenuIcon />
        </el-icon>
        <el-drawer
            v-model="drawerVisible"
            direction="ltr"
            size="70%"
            append-to-body
            :lock-scroll="false"
        >
            <div v-if="error">{{ $t('http.error') }}</div>
            <template v-else>
                <el-menu unique-opened>
                    <template v-for="menu in menuTreeList">
                        <el-sub-menu
                            v-if="menu.children && menu.children.length"
                            :key="menu.id"
                            :index="String(menu.id)"
                        >
                            <template #title>
                                <span>
                                    {{ menu.label }}
                                </span>
                            </template>
                            <el-menu-item
                                v-for="subMenu in menu.children"
                                :key="subMenu.id"
                                :index="String(subMenu.id)"
                            >
                                <NuxtLinkLocale
                                    v-if="subMenu.linkType === '0'"
                                    :key="'nuxtLink_' + subMenu.id"
                                    :to="subMenu.link || ''"
                                    :target="subMenu.openType === '1' ? '_blank' : '_self'"
                                    class="item"
                                >
                                    {{ subMenu.label }}
                                </NuxtLinkLocale>
                                <NuxtLink
                                    v-else
                                    :key="'nuxtLink_' + subMenu.id"
                                    :to="subMenu.link || ''"
                                    :target="subMenu.openType === '1' ? '_blank' : '_self'"
                                    class="item">
                                    {{ subMenu.label }}
                                </NuxtLink>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item
                            v-else
                            :key="'menu_item_' + menu.id"
                            :index="String(menu.id)"
                        >
                            <NuxtLinkLocale
                                v-if="menu.linkType === '0'"
                                :key="'nuxtLink_' + menu.id"
                                :to="menu.link || ''"
                                :target="menu.openType === '1' ? '_blank' : '_self'"
                                class="item"
                            >
                                {{ menu.label }}
                            </NuxtLinkLocale>
                            <NuxtLink
                                v-else
                                :key="'nuxtLink_' + menu.id"
                                :to="menu.link || ''"
                                :target="menu.openType === '1' ? '_blank' : '_self'"
                                class="item">
                                {{ menu.label }}
                            </NuxtLink>
                        </el-menu-item>
                    </template>
                    <el-menu-item>
                        <a :href="switchLocalePath('zh')">中文</a>
                        <span style="margin: 0 10px">/</span>
                        <a :href="switchLocalePath('en')">EN</a>
                    </el-menu-item>
                </el-menu>
            </template>
        </el-drawer>
    </div>
    <div class="nav pc">
        <template v-for="menu in menuTreeList">
            <el-dropdown
                v-if="menu.children && menu.children.length"
                :key="menu.id"
                class="item"
                :show-timeout="100"
            >
                <div style="display: flex; align-items: center; width: fit-content">
                    {{ menu.label }}
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            v-for="subMenu in menu.children"
                            :key="subMenu.id"
                        >
                            <NuxtLinkLocale
                                v-if="subMenu.linkType === '0'"
                                :key="'nuxtLink_' + subMenu.id"
                                :to="subMenu.link || ''"
                                :target="subMenu.openType === '1' ? '_blank' : '_self'"
                                class="dropdown-item"
                            >
                                {{ subMenu.label }}
                            </NuxtLinkLocale>
                            <NuxtLink
                                v-else
                                :key="'nuxtLink_' + subMenu.id"
                                :to="subMenu.link || ''"
                                :target="subMenu.openType === '1' ? '_blank' : '_self'"
                                class="dropdown-item">
                                {{ subMenu.label }}
                            </NuxtLink>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <template v-else>
                <NuxtLinkLocale
                    v-if="menu.linkType === '0'"
                    :key="'nuxtLink_' + menu.id"
                    :to="menu.link || ''"
                    :target="menu.openType === '1' ? '_blank' : '_self'"
                    class="item"
                >
                    {{ menu.label }}
                </NuxtLinkLocale>
                <NuxtLink
                    v-else
                    :key="'nuxtLink_' + menu.id"
                    :to="menu.link || ''"
                    :target="menu.openType === '1' ? '_blank' : '_self'"
                    class="item">
                    {{ menu.label }}
                </NuxtLink>
            </template>
        </template>

        <div class="item">
            <a :href="switchLocalePath('zh')">中文</a>
            /
            <a :href="switchLocalePath('en')">EN</a>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Menu as MenuIcon, ArrowDown } from '@element-plus/icons-vue'

    import getAllMenu from '~/http/apis/getAllMenu'
    import { handconstree } from '~/utils'

    const route = useRoute()

    const switchLocalePath = useSwitchLocalePath()

    const { data: menuTreeList, error } = useAsyncData(() => getAllMenu(), {
        server: false,
        transform: data => {
            const result = handconstree(data.data, 'id', 'parentId')
            return result
        },
        default: () => []
    })

    const drawerVisible = ref(false)

    watch(
        () => route.fullPath,
        () => {
            drawerVisible.value = false
        },
        {
            deep: true
        }
    )
</script>

<style scoped lang="less">
    .nav {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
        gap: 30px;
        position: relative;

        .item {
            cursor: pointer;
            color: inherit;
            font-feature-settings: 'clig' off, 'liga' off;
            font-family: Poppins;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            text-transform: capitalize;
            width: fit-content;
            color: #ffffff;
            > a {
                color: #ffffff;
            }
            i {
                color: #ffffff;
            }
        }
    }

    .pc {
        display: flex;
    }
    .mobile {
        display: none;
        height: 100%;
        align-items: center;
        i {
            color: #ffffff;
        }
    }
    :deep(.el-menu-item a) {
        width: 100%;
    }

    @media screen and (max-width: @viewport-md) {
        .pc {
            display: none;
        }
        .mobile {
            display: flex;
        }
    }

    .el-icon--right {
        color: @default-font-color;
    }

    :deep(.el-dropdown:has(.el-dropdown__popper[aria-hidden='false'])) {
        .el-tooltip__trigger {
            color: #0056f5;
        }
        .el-icon--right {
            transform: scaleY(-1);
        }
    }

    :deep(.el-dropdown__popper.el-popper) {
        border-radius: 12px;
        overflow: hidden;
    }

    :deep(.el-dropdown-menu) {
        padding: 16px 0;
    }

    :deep(.el-dropdown-menu__item) {
        color: inherit;
        font-feature-settings: 'clig' off, 'liga' off;
        padding: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: capitalize;
        min-width: 232px;
        box-sizing: border-box;
        & + .el-dropdown-menu__item {
            margin-top: 12px;
        }
        .dropdown-item {
            color: inherit;
            padding: 12px 24px;
            width: 100%;
            box-sizing: border-box;
        }
    }

    :deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
        background-color: #eff0f2;
        color: inherit;
    }

    :deep(.el-popper__arrow) {
        display: none;
    }

    :deep(.el-menu) {
        border-right: none;
    }
</style>
