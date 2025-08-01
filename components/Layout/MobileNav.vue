<template>
    <div class="mobile">
        <MobileNavButton class="mobile-menu-toggle" :expanded="isMenuOpen" @click="emit('update:isMenuOpen', !isMenuOpen)" />
        <el-drawer
            :model-value="isMenuOpen"
            direction="ttb"
            size="100%"
            append-to-body
            lock-scroll
            style="top: var(--header-height)"
            :modal="false"
            :show-close="false"
            :with-header="false"
            @update:model-value="value => emit('update:isMenuOpen', value)"
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
                                    :key="'nuxtLinkExternal_' + subMenu.id"
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
                                :key="'nuxtLinkExternal_' + menu.id"
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
</template>

<script setup lang="ts">
    import MobileNavButton from './MobileNavButton.vue'
    import getAllMenu from '~/http/apis/getAllMenu'
    import { handconstree } from '~/utils'

    const props = defineProps<{
        isMenuOpen: boolean
    }>()
    const emit = defineEmits(['update:isMenuOpen'])

    const route = useRoute()

    const switchLocalePath = useSwitchLocalePath()

    const { data: menuTreeList, error } = useAsyncData(() => getAllMenu(), {
        // server: false,
        transform: data => {
            const result = handconstree(data.data, 'id', 'parentId')
            return result
        },
        default: () => []
    })

    // 监听抽屉状态，控制body的overflow
    watch(
        () => props.isMenuOpen,
        (newValue) => {
            if (newValue) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = ''
            }
        }
    )

    watch(
        () => route.fullPath,
        () => {
            emit('update:isMenuOpen', false)
        },
        {
            deep: true
        }
    )
</script>

<style scoped lang="less">
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

    .el-icon--right {
        color: @default-font-color;
    }

    :deep(.el-menu) {
        border-right: none;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }

    :deep(.el-menu-item) {
        color: #101931;

        &:hover {
            background-color: rgba(0, 86, 245, 0.1);
            color: #0056f5;
        }
    }

    :deep(.el-sub-menu__title) {
        color: #101931;

        &:hover {
            background-color: rgba(0, 86, 245, 0.1);
            color: #0056f5;
        }
    }

    // 响应式设计
    @media screen and (max-width: @viewport-md) {
        .mobile {
            display: flex;
        }
    }
</style>
