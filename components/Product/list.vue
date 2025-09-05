<script setup lang="ts">
    import AddToCartButton from '~/components/Product/AddToCartButton.vue'
    import useRoutePath from '~/hooks/useRoutePath'
    import defaultImage from '~/assets/images/no-img.svg'

    type Product = {
        id: number
        slug: string
        label: string
        coverImagePath: string
    }

    defineProps<{
        productList: Product[]
    }>()

    const { productDetailPath } = useRoutePath()
</script>

<template>
    <div class="list-container">
        <div v-for="item in productList" :key="item.id" class="item-card" :aria-label="item.label">
            <div class="item-images">
                <NuxtImg v-if="item.coverImagePath" :placeholder="[100, 77, 100]" :src="item.coverImagePath" :alt="item.label" :title="item.label" />
                <img v-else :src="defaultImage" alt="default image" />
            </div>
            <div class="item-info">
                <h3 class="item-title">{{ item.label }}</h3>
            </div>
            <div class="button-container">
                <NuxtLinkLocale class="more-info-btn" :to="productDetailPath(item.slug)" target="_self">
                    {{ $t('Learn More') }}
                </NuxtLinkLocale>
                <AddToCartButton :product="item" button-size="large" simple />
            </div>
        </div>
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
            padding: 10px 10px 30px;
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

            &:hover {
                border-color: #004DFF;
                background-color: #004DFF;
                color: #fff;
            }
        }
    }
</style>
