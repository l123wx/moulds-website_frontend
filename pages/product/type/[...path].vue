<script setup lang="ts">
    // import { Collection } from '@element-plus/icons-vue'
    import getSubProductTypeListBySlug from '~/http/apis/getSubProductTypeListBySlug'
    import useRoutePath from '~/hooks/useRoutePath'

    const { productListPath, productTypeListPath } = useRoutePath()

    definePageMeta({
        layout: 'product'
    })

    const PAGE_SIZE = 12

    const route = useRoute()
    const { locale } = useI18n()

    const activeProductTypeSlug = computed(() => route.params.path[route.params.path.length - 1])

    const currentPage = ref(1)
    const { data, refresh } = await useAsyncData(
        'productTypes_' + activeProductTypeSlug.value,
        () => getSubProductTypeListBySlug(activeProductTypeSlug.value, currentPage.value, PAGE_SIZE, locale.value)
    )

    const productTypeList = computed(() => data.value?.rows)
    const total = computed(() => data.value?.total)

    const handleCurrentChange = (page: number) => {
        currentPage.value = page
        refresh()
    }

</script>

<template>
    <div>
        <el-empty v-if="!productTypeList?.length" :description="$t('No data')" />
        <template v-else>
            <div class="list-container">
                <div
                    v-for="item in productTypeList"
                    :key="item.id"
                    class="item-card"
                    :aria-label="item.label"
                >
                    <div class="item-images">
                        <NuxtImg format="webp" loading="lazy" :placeholder="[100, 77, 100]" :src="item.imagePath || 'no-img.svg'" :alt="item.title" :title="item.title" />
                    </div>
                    <div class="item-info">
                        <h3 class="item-title">{{ item.label }}</h3>
                    </div>
                    <NuxtLinkLocale
                        class="more-info-btn"
                        :to="item.isLeaf ? productListPath([...route.params.path, item.slug]) : productTypeListPath([...route.params.path, item.slug])"
                        target="_self">
                        {{ $t('Learn More') }}
                    </NuxtLinkLocale>
                </div>
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
                    opacity: 0.8;
                    transform: scale(1.1);
                }
            }
        }

        // .item-icon {
        //     background-color: #fff;
        //     width: 12%;
        //     position: absolute;
        //     right: 5px;
        //     top: 10px;
        //     z-index: 1;
        // }

        .item-images {
            overflow: hidden;
            padding: 15px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 4/3;
            width: 100%;

            img {
                width: 100%;
                height: 100%;
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

            &:hover {
                border-color: #004DFF;
                background-color: #004DFF;
                color: #fff;
            }
        }
    }

    .pagination-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
    }
</style>
