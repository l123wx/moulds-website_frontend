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
                <NuxtLinkLocale v-for="item in productList" :key="item.id" :to="`/product/detail/${item.slug}`" target="_self" class="item-card" :aria-label="item.label">
                    <div class="item-images">
                        <NuxtImg v-if="item.coverImagePath" loading="lazy" :src="item.coverImagePath" :alt="item.label" :title="item.label" />
                    </div>
                    <div class="item-info">
                        <h3 class="item-title">{{ item.label }}</h3>
                    </div>
                    <div class="more-info-btn">
                        {{ $t('Learn More') }}
                    </div>
                </NuxtLinkLocale>
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
    .list-container {
        display: flex;
        flex-wrap: wrap;
        padding-top: 20px;
        border-top: 1px solid #EBEBEB;

        .item-card {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100%;
            border: 1px solid #EBEBEB;
            background-color: #fff;
            transition: var(--transition-normal);
            overflow: hidden;
            cursor: pointer;

            flex: 0 0 25%;
            padding: 10px;
            box-sizing: border-box;

            @media screen and (max-width: @viewport-lg) {
                flex: 0 0 33.33%;
            }

            @media screen and (max-width: @viewport-md) {
                flex: 0 0 50%;
            }

            &:hover {
                .item-images img {
                    opacity: 0.9;
                    transform: scale(1.05);
                }

                .more-info-btn {
                    border-color: #004DFF;
                    background-color: #004DFF;
                    color: #fff;
                }
            }
        }

        .item-images {
            overflow: hidden;
            padding: 15px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 4/3;

            img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                transition: transform 0.5s ease, opacity 0.3s ease;
            }
        }

        .item-info {
            flex: 1;
            width: 100%;
            padding: 15px 5px;
            background-color: #fff;
            transition: all 0.3s ease;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
        }

        .item-title {
            font-size: 16px;
            color: #333;
            text-align: center;
            font-weight: bold;
            width: 100%;
            transition: all 0.3s ease;
            margin: 0;
        }

        .more-info-btn {
            padding: 10px;
            width: 100px;
            background-color: transparent;
            color: #666666;
            border: 1px solid #ccc;
            border-radius: 30px;
            font-size: 14px;
            text-align: center;
            display: inline-block;
            transition: all 0.3s ease;
            margin-bottom: 30px;
        }
    }

    .pagination-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
    }
</style>
