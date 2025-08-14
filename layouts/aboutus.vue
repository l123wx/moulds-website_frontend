<template>
    <DefaultLayout>
        <SubMenuContainer
            :active-menu-id="activeMenuId"
            :sub-menu-tree="subMenuTree"
            :sub-menu-pending="subMenuPending"
            hide-sub-menu-on-mobile
            @refresh="subMenuRefresh"
        >
            <slot />
        </SubMenuContainer>
        <LiveChat />
    </DefaultLayout>
</template>

<script setup lang="ts">
    import DefaultLayout from './default.vue'

    import LiveChat from '~/components/LiveChat/index.vue'
    import type { MenuItem } from '~/components/Layout/InfiniteMenu.vue'
    import SubMenuContainer from '~/components/SubMenuContainer.vue'
    import getWebsiteMenuHierarchyById from '~/http/apis/getWebsiteMenuHierarchyById'
    import { handconstree } from '~/utils'

    const route = useRoute()
    const { locale } = useI18n()

    const ABOUT_US_MENU_ID = 2
    const { data: subMenuList, pending: subMenuPending, refresh: subMenuRefresh } = await useAsyncData(
        'getWebsiteMenuHierarchyById_' + ABOUT_US_MENU_ID,
        () => getWebsiteMenuHierarchyById(ABOUT_US_MENU_ID),
        {
            transform: (data) => data.data,
            default: () => []
        }
    )

    const subMenuTree = computed(() => {
        const menuList: MenuItem[] = subMenuList.value.map(menu => ({
            id: menu.id,
            parentId: menu.parentId,
            label: menu.label,
            link: menu.link,
            index: menu.link
        }))

        const treeData = handconstree(menuList, 'id', 'parentId')

        return treeData[0] || []
    })

    const activeMenuId = computed(() => route.fullPath.replace(`/${locale.value}`, ''))
</script>

<style scoped lang="less"></style>
