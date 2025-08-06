<template>
    <DefaultLayout>
        <SubMenuContainer
            :active-menu-id="activeMenuId"
            :sub-menu-tree="subMenuTree"
            :sub-menu-pending="subMenuPending"
            @refresh="subMenuRefresh"
        >
            <div style="padding-top: 5px;">
                <Breadcrumb :breadcrumb-list="breadcrumbList" :breadcrumb-pending="breadcrumbPending" />
            </div>
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
    import Breadcrumb from '~/components/Layout/Breadcrumb.vue'
    import getAllParentProductTypeBySlug from '~/http/apis/getAllParentProductTypeBySlug'
    import getProductTypeHierarchyBySlug from '~/http/apis/getProductTypeHierarchyBySlug'
    import { handconstree } from '~/utils'

    const route = useRoute()
    const activeProductTypeSlug = computed(() => {
        return route.params.path[route.params.path.length - 1]
    })
    const activeRootParentType = computed(() => {
        return route.params.path[0]
    })

    const { data: subMenuList, pending: subMenuPending, refresh: subMenuRefresh } = await useAsyncData(
        'productTypeSubMenu_' + activeRootParentType.value,
        () => getProductTypeHierarchyBySlug(activeRootParentType.value),
        {
            transform: (data) => data.data,
            default: () => [],
            watch: [activeRootParentType]
        }
    )

    const { data: breadcrumbList, pending: breadcrumbPending } = await useAsyncData(
        'getAllParentProductTypeBySlug_' + activeProductTypeSlug.value,
        () => getAllParentProductTypeBySlug(activeProductTypeSlug.value),
        {
            transform: (data) => {
                let basePath = '/product/type'
                return data.data.map(type => {
                    basePath += `/${type.slug}`
                    return {
                        label: type.label,
                        link: basePath
                    }
                })
            },
            default: () => [],
            watch: [activeProductTypeSlug]
        }
    )

    const subMenuTree = computed(() => {
        const menuList: MenuItem[] = subMenuList.value.map(productType => ({
            id: productType.id,
            parentId: productType.parentId,
            label: productType.label,
            link: productType.slug,
            index: productType.id.toString()
        }))

        const treeData = handconstree(
            menuList, 'id', 'parentId', 'children',
            (data, parentData, isLeaf) => {
                data.link = parentData ? `${parentData.link}/${data.link}` : `/product/type/${data.link}`

                if (isLeaf) {
                    data.link = data.link.replaceAll('/type/', '/list/')
                }

                return data
            }
        )

        return treeData[0] || []
    })

    const activeMenuId = computed(() => {
        return subMenuList.value.find(item => item.slug === activeProductTypeSlug.value)?.id?.toString() || ''
    })
</script>

<style scoped lang="less"></style>
