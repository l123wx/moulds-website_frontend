<script lang="ts">
    export type BreadcrumbItem = {
        label: string,
        link?: string,
    }
</script>

<script setup lang="ts">
    import { ArrowRight } from '@element-plus/icons-vue'

    defineProps<{
        breadcrumbList: BreadcrumbItem[],
        breadcrumbPending?: boolean,
    }>()

    const localePath = useLocalePath()
</script>

<template>
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
</template>

<style scoped lang="less">

</style>
