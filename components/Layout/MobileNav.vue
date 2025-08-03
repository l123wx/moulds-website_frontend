<template>
    <div class="mobile">
        <div class="menu-container" :class="{ open: isMenuOpen }">
            <div v-if="error">{{ $t('http.error') }}</div>
            <template v-else>
                <el-menu class="mobile-menu" unique-opened>
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
                                <Link
                                    :key="'link_' + subMenu.id"
                                    :to="subMenu.link || ''"
                                    :link-type="subMenu.linkType"
                                    :open-type="subMenu.openType"
                                    class="item"
                                >
                                    {{ subMenu.label }}
                                </Link>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item
                            v-else
                            :key="'menu_item_' + menu.id"
                            :index="String(menu.id)"
                        >
                            <Link
                                :key="'link_' + menu.id"
                                :to="menu.link || ''"
                                :link-type="menu.linkType"
                                :open-type="menu.openType"
                                class="item"
                            >
                                {{ menu.label }}
                            </Link>
                        </el-menu-item>
                    </template>
                    <!-- <el-menu-item>
                            <a :href="switchLocalePath('zh')">中文</a>
                            <span style="margin: 0 10px">/</span>
                            <a :href="switchLocalePath('en')">EN</a>
                        </el-menu-item> -->
                </el-menu>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Link from '~/components/Link.vue'

    const props = defineProps<{
        isMenuOpen: boolean
        menuTreeList: any[],
        error: any
    }>()
    const emit = defineEmits(['update:isMenuOpen'])

    const route = useRoute()

    const switchLocalePath = useSwitchLocalePath()

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

    .menu-container {
        height: 100vh;
        width: 100%;
        overflow-y: auto;
        position: absolute;
        padding-top: var(--header-height);
        top: -100vh;
        background-color: #ffffff;
        transition: top 0.3s ease-in-out;
        display: none;

        @media screen and (max-width: @viewport-md) {
            display: block;
        }

        &.open {
            top: 0;
        }
    }

    .mobile-menu {
        border-right: none;
    }
</style>
