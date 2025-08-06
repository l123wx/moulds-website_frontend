<script setup lang="ts">
    import getProductListByProductTypeSlug from '~/http/apis/getProductListByProductTypeSlug'

    definePageMeta({
        layout: 'product'
    })

    const PAGE_SIZE = 12

    const route = useRoute()

    const activeProductTypeSlug = computed(() => route.params.path[route.params.path.length - 1])

    const currentPage = ref(1)
    const { data, refresh } = await useAsyncData(
        'getProductListByProductTypeSlug_' + activeProductTypeSlug.value,
        () => getProductListByProductTypeSlug(activeProductTypeSlug.value, currentPage.value, PAGE_SIZE)
    )
    const productList = computed(() => data.value?.rows)
    const total = computed(() => data.value?.total)

    const handleCurrentChange = (page: number) => {
        currentPage.value = page
        refresh()
    }

</script>

<template>
    <div>
        <el-empty v-if="!productList?.length" :description="$t('No data')" />
        <template v-else>
            <div class="list-container">
                <ProductList :product-list="productList" />
            </div>
            <div class="pagination-container">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="PAGE_SIZE"
                    @current-change="handleCurrentChange"
                />
            </div>
        </template>
    </div>
</template>

<style scoped lang="less">
    .pagination-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
    }
</style>
