<template>
    <div class="container">
        <Breadcrumb :breadcrumb-list="breadcrumbList" />
        <div style="padding-top: 15px;">
            <ProductList v-if="productList.length" :product-list="productList" :loading="pending" />
            <el-empty v-else :description="$t('No data')" />
            <div v-if="productList.length" class="pagination-container">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="PAGE_SIZE"
                    @current-change="handleCurrentChange"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Breadcrumb from '~/components/Layout/Breadcrumb.vue'
    import getProductListByKeyword from '~/http/apis/getProductListByKeyword'

    const route = useRoute()
    const { locale } = useI18n()
    const searchValue = computed(() => route.query.q as string)

    const currentPage = ref(1)
    const PAGE_SIZE = 12

    const breadcrumbList = ref([
        {
            label: $t('Search')
        }
    ])

    const { data, refresh, pending } = useAsyncData(
        'getProductListByKeyword_' + searchValue.value,
        () => getProductListByKeyword(searchValue.value as string, currentPage.value, PAGE_SIZE, locale.value),
        {
            watch: [searchValue]
        }
    )

    const productList = computed(() => data.value?.rows ?? [])
    const total = computed(() => data.value?.total ?? 0)

    const handleCurrentChange = (page: number) => {
        currentPage.value = page
        refresh()
    }
</script>

<style scoped lang="less">
    .container {
        padding: 40px 0 50px;
        margin: 0 auto;
        width: 90%;
        max-width: @page-content-max-width;
        min-height: calc(100vh - var(--header-height) - - 100vh/5);

        @media screen and (max-width: @viewport-md) {
            margin: 50px auto;
            padding: 0 18px;
        }
    }

    .pagination-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
    }
</style>
