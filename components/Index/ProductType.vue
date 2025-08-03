<script setup lang="ts">
    import { ref } from 'vue'
    import ProductTypeList, { type ProductItem } from './ProductTypeList.vue'
    import getHomePageProductTypes from '~/http/apis/getHomePageProductTypes'

    const activeTabIndex = ref(0)

    const localePath = useLocalePath()

    const { data: productTypes, error } = await useAsyncData(
        'productTypes',
        () => getHomePageProductTypes(),
        {
            server: false,
            transform: (data) => {
                return data.data?.map(firstType => {
                    return {
                        id: firstType.id,
                        title: firstType.name,
                        image: firstType.imagePath,
                        children: firstType.children?.map(subType => {
                            return {
                                id: subType.id,
                                title: subType.name,
                                image: subType.imagePath,
                                href: localePath(`/product/type/${firstType.slug}/${subType.slug}`)
                            }
                        })
                    }
                })
            },
            default: () => [] as (ProductItem & { children: ProductItem[] })[]
        }
    )

</script>

<template>
    <div v-if="error">
        <div class="error-container">
            <h1>Error</h1>
            <p>{{ error.message }}</p>
        </div>
    </div>
    <div v-else class="product-type-container">
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
    </div>
</template>

<style scoped lang="less">
    .product-type-container {
        padding: 30px 15px;
        max-width: @page-content-max-width;
        margin: 0 auto;
        background-color: #f2f2f2;

        @media screen and (max-width: @viewport-md) {
            // padding: 0 18px;
        }

        .tabs {
            display: flex;
            text-align: center;
            justify-content: center;
            margin-bottom: 30px;
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

                &.active {
                    color: #004DFF;
                    border: 1px solid #004DFF;
                }
            }
        }
    }
</style>
