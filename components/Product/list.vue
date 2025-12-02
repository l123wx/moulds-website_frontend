<script setup lang="ts">
    import AddToCartButton from '~/components/Product/AddToCartButton.vue'
    import useRoutePath from '~/hooks/useRoutePath'

    type Product = {
        id: number
        slug: string
        label: string
        coverImagePath: string
    }

    defineProps<{
        productList: Product[],
        loading?: boolean
    }>()

    const { productDetailPath } = useRoutePath()
</script>

<template>
    <el-skeleton class="list-container" animated :loading="loading" :count="12">
        <template #default>
            <div class="list-container">
                <NuxtLinkLocale
                    v-for="item in productList"
                    :key="item.id"
                    :to="productDetailPath(item.slug)"
                    target="_self"
                    class="item-card"
                    :aria-label="item.label"
                >
                    <div class="item-images">
                        <NuxtImg format="webp" loading="lazy" background="transparent" :placeholder="[100, 77, 100]" :src="item.coverImagePath || 'no-img.svg'" :alt="item.label" :title="item.label" />
                    </div>
                    <div class="item-info">
                        <h3 class="item-title">{{ item.label }}</h3>
                    </div>
                    <div class="button-container">
                        <div class="more-info-btn">
                            {{ $t('Learn More') }}
                        </div>
                        <AddToCartButton :product="item" button-size="large" simple @click.prevent="() => {}" />
                    </div>
                </NuxtLinkLocale>
            </div>
        </template>
        <template #template>
            <div class="item-card">
                <div class="item-images">
                    <el-skeleton-item style="width: 100%; height: 300px;" variant="image" />
                </div>
                <div class="item-info">
                    <h3 class="item-title">
                        <el-skeleton-item style="width: 90%;" variant="text" />
                    </h3>
                </div>
                <div class="button-container">
                    <el-skeleton-item style="width: 100px" variant="button" />
                </div>
            </div>
        </template>
    </el-skeleton>
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
            padding: 10px 10px 30px;
            box-sizing: border-box;

            @media screen and (max-width: @viewport-lg) {
                flex: 0 0 33.33%;
            }

            @media screen and (max-width: @viewport-md) {
                flex: 0 0 50%;
            }

            &:hover {
                border-color: #004DFF;

                .item-images img {
                    opacity: 0.8;
                    transform: scale(1.1);
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

        .button-container {
            display: flex;
            gap: 10px;
        }

        .more-info-btn {
            padding: 10px 15px;
            background-color: transparent;
            color: #666666;
            border: 1px solid #ccc;
            border-radius: 30px;
            font-size: 14px;
            text-align: center;
            display: inline-block;
            transition: all 0.3s ease;
        }
    }
</style>
