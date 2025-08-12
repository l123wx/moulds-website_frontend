<script setup lang="ts">
    import { type MenuItem } from './InfiniteMenu.vue'
    import Link from '~/components/Link.vue'

    defineProps<{
        menu: MenuItem
    }>()
</script>

<template>
    <el-sub-menu v-if="menu.children && menu.children.length" :index="String(menu.id)">
        <template #title>
            <Link
                v-if="menu.link"
                :to="menu.link || ''"
                :link-type="menu.linkType"
                :open-type="menu.openType"
                class="item"
            >
                {{ menu.label }}
            </Link>
            <span v-else>{{ menu.label }}</span>
        </template>
        <!-- 递归渲染子菜单 -->
        <RecursiveMenuItem
            v-for="subMenu in menu.children"
            :key="subMenu.id"
            :menu="subMenu"
        />
    </el-sub-menu>
    <el-menu-item v-else :index="String(menu.id)">
        <Link
            :to="menu.link || ''"
            :link-type="menu.linkType"
            :open-type="menu.openType"
            class="item"
            @click.capture="() => {}"
        >
            {{ menu.label }}
        </Link>
    </el-menu-item>
</template>
