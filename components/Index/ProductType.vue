<script setup lang="ts">
    import { ref } from 'vue'
    import ProductTypeList, { type ProductItem } from './ProductTypeList.vue'
    import getHomePageProductTypes from '~/http/apis/getHomePageProductTypes'
    import getSubProductTypeListBySlug from '~/http/apis/getSubProductTypeListBySlug'
    import getProductListByProductTypeSlug from '~/http/apis/getProductListByProductTypeSlug'
    import useRoutePath from '~/hooks/useRoutePath'

    const { locale } = useI18n()
    const { productTypeListPath, productDetailPath } = useRoutePath()
    const activeTabIndex = ref(0)

    const { data: productTypes, error } = await useAsyncData(
        'productTypes',
        async () => {
            const res = await getHomePageProductTypes(locale.value)
            const productTypes = res.data as any[]

            if (productTypes?.length) {
                const firstType = productTypes[0]
                const secondType = productTypes[1]

                // 第一个分类获取子分类，第二个分类获取商品

                const firstTypeChildren = await getSubProductTypeListBySlug(firstType.slug, 1, 100, locale.value)
                const secondTypeProducts = await getProductListByProductTypeSlug(secondType.slug, 1, 100, locale.value)

                productTypes[0].children = firstTypeChildren.rows
                productTypes[1].children = secondTypeProducts.rows
            }

            return productTypes?.map((firstType, index) => {
                return {
                    id: firstType.id,
                    title: firstType.label,
                    image: firstType.imagePath,
                    children: index === 0
                        ? firstType.children?.map((subType: any) => {
                            return {
                                id: subType.id,
                                title: subType.label,
                                image: subType.imagePath,
                                href: productTypeListPath([firstType.slug, subType.slug])
                            }
                        })
                        : firstType.children?.map((subProduct: any) => {
                            return {
                                id: subProduct.id,
                                title: subProduct.label,
                                image: subProduct.coverImagePath,
                                href: productDetailPath(subProduct.slug)
                            }
                        })
                }
            })
        },
        {
            default: () => [] as (ProductItem & { children: ProductItem[] })[]
        }
    )

</script>

<template>
    <div style="background-color: #f2f2f2;">
        <div class="product-type-container">
            <div v-if="error">
                <div class="error-container">
                    <h1>Error</h1>
                    <p>{{ error.message }}</p>
                </div>
            </div>
            <template v-else>
                <div class="tabs">
                    <div
                        v-for="(item, index) in productTypes"
                        :key="item.id"
                        class="tab-item"
                        :class="{ active: activeTabIndex === index }"
                        @click="activeTabIndex = index"
                    >
                        {{ item.title }}
                    </div>
                </div>
                <div v-for="(item, index) in productTypes" :key="item.id" class="tab-content">
                    <ProductTypeList v-if="activeTabIndex === index" :items="item.children" />
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="less">
    .product-type-container {
        padding: 30px 15px 50px;
        max-width: @page-content-max-width;
        margin: 0 auto;

        @media screen and (max-width: @viewport-md) {
            // padding: 0 18px;
        }

        .tabs {
            display: flex;
            text-align: center;
            justify-content: center;
            margin-bottom: 30px;

            @media screen and (max-width: @viewport-md) {
                gap: 10px;
            }

            .tab-item {
                display: block;
                line-height: 50px;
                text-align: center;
                font-size: 18px;
                cursor: pointer;
                position: relative;
                font-weight: 600;
                float: left;
                border-radius: 100px;
                border: 1px solid #aaa;
                width: 400px;
                margin: 0px 20px;
                padding: 0 20px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;

            @media screen and (max-width: @viewport-md) {
                font-size: 14px;
                margin: 0;
                width: fit-content;
            }

                &.active {
                    color: #004DFF;
                    border: 1px solid #004DFF;
                }
            }
        }
    }
</style>
