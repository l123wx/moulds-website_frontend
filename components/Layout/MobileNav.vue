<template>
    <div class="mobile">
        <div class="menu-container" :class="{ open: isMenuOpen }">
            <div v-if="error">{{ $t('http.error') }}</div>
            <template v-else>
                <InfiniteMenu class="mobile-menu" :menu-list="menuTreeList" />
                <NuxtLinkLocale class="el-menu-item" :to="productCatalogDownloadPath">
                    {{ $t('Product Catalog Download') }}
                </NuxtLinkLocale>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import InfiniteMenu from './InfiniteMenu.vue'
    import useBodyScroll from '~/hooks/useBodyScroll'
    import useRoutePath from '~/hooks/useRoutePath'

    const props = defineProps<{
        isMenuOpen: boolean
        menuTreeList: any[],
        error: any
    }>()
    const emit = defineEmits(['update:isMenuOpen'])

    const route = useRoute()
    const { lock, unlock } = useBodyScroll()
    const { productCatalogDownloadPath } = useRoutePath()
    // 监听抽屉状态，控制body的overflow
    watch(
        () => props.isMenuOpen,
        (newValue) => {
            if (newValue) {
                lock()
            } else {
                unlock()
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
