<script lang="ts">
    export interface MenuItem {
        id: string | number
        label: string
        link?: string
        linkType?: string
        openType?: string
        children?: Array<MenuItem>
    }
</script>

<script setup lang="ts">
    import type { ElMenu } from 'element-plus'
    import RecursiveMenuItem from './RecursiveMenuItem.vue'

    interface MenuProps {
        menuList: Array<MenuItem>
        defaultActive?: string
        mode?: 'horizontal' | 'vertical'
        uniqueOpened?: boolean
        backgroundColor?: string
        textColor?: string
        activeTextColor?: string
    }

    withDefaults(defineProps<MenuProps>(), {
        defaultActive: '',
        mode: 'vertical',
        uniqueOpened: true,
        backgroundColor: '',
        textColor: '',
        activeTextColor: ''
    })

    const menuRef = ref<InstanceType<typeof ElMenu>>()
    const emits = defineEmits(['select'])

    const handleSelect = (index: string) => {
        emits('select', index)
    }
</script>

<template>
    <el-menu
        ref="menuRef"
        :default-active="defaultActive"
        :mode="mode"
        :unique-opened="uniqueOpened"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        class="infinite-menu"
        @select="handleSelect"
    >
        <RecursiveMenuItem
            v-for="menu in menuList"
            :key="menu.id"
            :menu="menu"
            :level="1"
        />
    </el-menu>
</template>

<style scoped lang="less">
.infinite-menu {
  border-right: none;
}

:deep(.el-menu-item) {
    &.is-active .item {
        color: @main-color;
    }

    .item {
        width: 100%;
    }

    .item:hover, .router-link-active {
        color: @main-color;
    }
}

:deep(.el-sub-menu) {
    .item, .el-menu-item {
        width: 100%;
    }
    .el-sub-menu__title .el-menu-item {
        padding: 0;
    }
    .el-sub-menu__title > .router-link-active {
        color: @main-color;
    }
    &.is-active > .el-sub-menu__title .item {
        color: @main-color;
    }
}
</style>
