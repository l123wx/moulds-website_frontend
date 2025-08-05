<template>
    <div>
        <div style="padding-top: 5px;">
            <Breadcrumb :breadcrumb-list="breadcrumbList" :breadcrumb-pending="false" />
        </div>

        <el-skeleton :loading="pageDetailPending" animated>
            <template #template>
                <div class="page-title">
                    <el-skeleton-item variant="h1" style="width: 50%;" />
                </div>
                <div class="page-content">
                    <el-skeleton-item v-for="i in 5" :key="i" variant="text" style="width: 100%;" />
                </div>
            </template>
            <template #default>
                <div class="page-title">
                    {{ pageDetail?.title }}
                </div>
                <div class="page-content">
                    <div v-html="pageDetail?.content" />
                </div>
            </template>
        </el-skeleton>
    </div>
</template>

<script setup lang="ts">
    import Breadcrumb from '~/components/Layout/Breadcrumb.vue'
    import getPageDetailBySlug from '~/http/apis/getPageDetailBySlug'
    import useTinyMCEStyle from '~/hooks/useTinyMCEStyle'

    useTinyMCEStyle()
    definePageMeta({
        layout: 'about-us'
    })

    const route = useRoute()

    const breadcrumbList = ref([
        {
            label: 'About Us'
        },
        {
            label: 'Blogs'
        }
    ])

    const activePageSlug = computed(() => route.params.path[route.params.path.length - 1])
    const { data: pageDetail, pending: pageDetailPending } = await useAsyncData(
        'getPageDetailBySlug_' + activePageSlug.value,
        () => getPageDetailBySlug(activePageSlug.value),
        {
            transform: (data) => data.data
        }
    )
</script>

<style scoped lang="less">
    .page-title {
        font-size: 32px;
        color: rgba(34, 34, 34, 1);
        line-height: 1.5;
        text-align: left;
        font-weight: bold;
        padding-top: 0px;
        margin-top: 30px;
        margin-bottom: 20px;
    }
</style>
