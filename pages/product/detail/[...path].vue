<template>
    <div class="product-detail-container">
        <div v-if="productData" class="product-content">
            <div class="info-container">
                <div class="product-gallery-section">
                    <ImageGallery
                        :banner-list="bannerList"
                        :product-name="productData.name"
                    />
                </div>

                <div class="product-info-section">
                    <h1 class="product-title">{{ productData.name }}</h1>

                    <div class="product-description">
                        {{ productData.description }}
                    </div>

                    <div class="product-download-buttons">
                        <el-button round type="primary" plain size="large">
                            <el-icon size="18">
                                <Download />
                            </el-icon>
                            {{ $t('2D & 3D Download') }}
                        </el-button>
                        <el-button round type="primary" size="large" class="add-to-cart-btn">
                            <el-icon size="20">
                                <ShoppingCart />
                            </el-icon>
                            {{ $t('Add to Cart') }}
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="detail-container">
                <h2 class="detail-title">{{ $t('Product Details') }}</h2>
                <div ref="detailContentRef" class="detail-content" v-html="productData.content"></div>
            </div>
        </div>
        <div v-else class="loading-container">
            <el-skeleton :rows="10" animated />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Download } from '@element-plus/icons-vue'
    import ShoppingCart from '~/components/Icon/ShoppingCart.vue'
    import useTinyMCEStyle from '~/hooks/useTinyMCEStyle'
    import ImageGallery from '~/components/Product/ImageGallery.vue'
    import getProductDetailBySlug from '~/http/apis/getProductDetailBySlug'

    useTinyMCEStyle()
    const route = useRoute()
    const { path } = route.params
    const slug = Array.isArray(path) ? path.join('/') : path

    const { data: productData } = await useAsyncData(
        `product-${slug}`,
        () => getProductDetailBySlug(slug),
        {
            transform: (data) => data?.data || {},
            server: false
        }
    )

    const bannerList = computed(() => {
        return productData.value?.bannerList.sort((a, b) => a.order - b.order).map((banner) => ({
            src: banner.path,
            type: banner.type
        })) || []
    })
</script>

<style scoped lang="less">
.product-detail-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;

    .product-content {
        .info-container {
            display: flex;
            flex-wrap: wrap;
            gap: 50px;
        }

        .product-gallery-section {
            width: 300px;

            @media screen and (max-width: @viewport-md) {
                width: 100%;
            }
        }

        .product-info-section {
            flex: 1;
            min-width: 300px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding-top: 10px;

            .product-title {
                font-size: 24px;
                color: #333;
                margin: 0;
            }

            .product-price {
                font-size: 22px;
                color: #f56c6c;
                font-weight: bold;
            }

            .product-description {
                line-height: 1.6;
                color: #666;
                white-space: pre-line;
            }

            .product-download-buttons {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                .el-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0;

                    :deep(span) {
                        gap: 5px;
                    }
                }
            }
        }
    }

    .loading-container {
        padding: 20px;
    }

    .detail-container {
        margin-top: 40px;
        padding-top: 30px;
        background-color: #ffffff;
        border-top: 1px solid rgba(0, 0, 0, 0.08);

        .detail-title {
            font-size: 22px;
            margin-bottom: 50px;
            margin-top: 0;
            color: #333;
            font-weight: 600;
            position: relative;
            padding-bottom: 10px;

            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 50px;
                height: 3px;
                background-color: #409EFF;
            }
        }

        .detail-content {
            overflow: auto;
            padding-bottom: 10px;
        }
    }
}

@media screen and (max-width: @viewport-md) {
    .product-detail-container {
        .product-content {
            flex-direction: column;

            .product-gallery-section,
            .product-info-section {
                max-width: 100%;
            }
        }

        .detail-container {
            padding: 20px 0;
            margin-top: 30px;

            .detail-title {
                margin-bottom: 20px;
                font-size: 20px;
            }

        }
    }
}
</style>
