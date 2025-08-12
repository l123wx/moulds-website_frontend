<template>
    <div class="header-container">
        <!-- 主导航栏 -->
        <div class="main-header">
            <div class="main-header-content">
                <!-- 品牌Logo区域 -->
                <div class="brand-section">
                    <NuxtLinkLocale class="brand-logo" :to="homePath">
                        <img src="~/assets/images/logo.png" alt="Logo" />
                    </NuxtLinkLocale>
                </div>

                <!-- 导航菜单 -->
                <PCNav class="pc-nav" :menu-tree-list="menuTreeList" :error="error" />

                <div class="operations">
                    <!-- 产品目录下载按钮 -->
                    <div class="download-section item">
                        <NuxtLinkLocale class="download-btn" :to="productCatalogDownloadPath">
                            <span>{{ $t('Product Catalog Download') }}</span>
                        </NuxtLinkLocale>
                    </div>

                    <!-- 购物车 -->
                    <ClientOnly>
                        <NuxtLinkLocale class="cart-section item" to="/cart">
                            <el-badge :value="uniqueItemCount" :hidden="uniqueItemCount === 0" class="item">
                                <ShoppingCart />
                                <span>{{ $t('ShoppingCart') }}</span>
                            </el-badge>
                        </NuxtLinkLocale>
                        <template #fallback>
                            <el-skeleton style="width: 60px" animated>
                                <template #template>
                                    <el-skeleton-item variant="text" />
                                </template>
                            </el-skeleton>
                        </template>
                    </ClientOnly>

                    <!-- 搜索 -->
                    <div class="search-section item">
                        <div class="search_warp" @click="handleSearchBarOpen">
                            <svg t="1602919003135" class="ss_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9837" width="24" height="24">
                                <path d="M951.9 904.8l-152-162.5c61.8-74 95.6-167.4 95.5-263.9 0-228.3-186-414.1-414.5-414.1S66.5 250 66.5 478.4c0 228.4 186 414.1 414.5 414.1 59.2 0.1 117.8-12.6 171.7-37.1 16-7.3 23-26.2 15.7-42.2-7.3-16-26.2-23-42.2-15.7-108.5 49.2-234.6 40-334.8-24.5-100.2-64.5-160.9-175.4-161-294.6 0.3-193.5 157.2-350.2 350.7-350.3 193.4 0 350.8 157.2 350.8 350.3 0.1 90.5-34.9 177.5-97.8 242.6-12.2 12.7-11.8 32.8 0.9 45 1 1 2.2 1.3 3.3 2 0.9 1.3 1.3 2.7 2.5 4l164.9 176.3c12 12.8 32.1 13.5 45 1.5 12.6-12 13.2-32.2 1.2-45z m0 0" p-id="9838"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="search-bar" :class="{ show: isSearchBarOpen }">
                        <div class="container">
                            <div class="input-container">
                                <input ref="searchInputRef" v-model="searchValue" type="text" :placeholder="$t('Search')" @keyup.enter="handleSearchSubmit" />
                            </div>
                            <el-button plain class="search-button" @click="handleSearchSubmit">{{ $t('Search') }}</el-button>
                            <el-button text class="close-button" @click="handleSearchBarClose">
                                <Close />
                            </el-button>
                        </div>
                    </div>

                    <LanguageDropdown />

                    <MobileNavButton class="mobile-menu-toggle" :expanded="isMobileMenuOpen" @click="isMobileMenuOpen = !isMobileMenuOpen" />
                </div>
            </div>
        </div>
        <MobileNav v-model:is-menu-open="isMobileMenuOpen" :menu-tree-list="menuTreeList" :error="error" />
    </div>
</template>

<script setup lang="ts">
    import { Close } from '@element-plus/icons-vue'
    import PCNav from './PCNav.vue'
    import MobileNav from './MobileNav.vue'
    import MobileNavButton from './MobileNavButton.vue'
    import LanguageDropdown from './LanguageDropdown.vue'
    import ShoppingCart from '~/components/Icon/ShoppingCart.vue'
    import useCart from '~/hooks/useCart'
    import getAllMenu from '~/http/apis/getAllMenu'
    import { handconstree } from '~/utils'
    import useRoutePath from '~/hooks/useRoutePath'

    const router = useRouter()
    const { locale } = useI18n()
    const localePath = useLocalePath()
    const { homePath, productCatalogDownloadPath, productSearchPath } = useRoutePath()
    const isMobileMenuOpen = ref(false)

    const searchInputRef = ref()
    const isSearchBarOpen = ref(false)
    const searchValue = ref('')

    const { uniqueItemCount } = useCart()

    const { data: menuTreeList, error } = useAsyncData(
        'getAllMenu',
        () => getAllMenu(), {
            transform: data => handconstree(data.data, 'id', 'parentId'),
            default: () => [],
            watch: [locale]
        }
    )

    const handleSearchBarOpen = () => {
        isSearchBarOpen.value = true
        nextTick(() => {
            searchInputRef.value?.focus()
        })
    }

    const handleSearchBarClose = () => {
        isSearchBarOpen.value = false
        searchValue.value = ''
    }

    const handleSearchSubmit = () => {
        if (searchValue.value.trim() === '') { return }

        router.push(localePath(productSearchPath(searchValue.value)))
        handleSearchBarClose()
    }
</script>

<style scoped lang="less">
    .header-container {
        position: sticky;
        width: 100%;
        top: 0;
        z-index: 1000;
        background: #ffffff;
    }

    // 主导航栏
    .main-header {
        background: #ffffff;
        box-shadow: 0 0 15px rgb(0 0 0 / 20%);
        position: relative;
        z-index: 1;

        .main-header-content {
            max-width: @page-content-max-width;
            height: var(--header-height);
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            position: relative;
        }

        .pc-nav {
            padding-left: 30px;

            @media screen and (max-width: @viewport-lg) {
                padding-left: 10px;
            }
        }

        .brand-section {
            flex: 0 0 auto;
            text-align: center;
            display: flex;
            align-items: center;

            .brand-logo {
                display: flex;
                align-items: center;
                height: 100%;
                max-width: 100px;

                @media screen and (max-width: @viewport-lg) {
                    max-width: 80px;
                }

                img {
                    width: 100%;
                }
            }
        }

        .mobile-menu-toggle {
            display: none;
        }

        .operations {
            display: flex;
            align-items: center;
            gap: 20px;

            .item {
                position: relative;
                display: flex;
                align-items: center;
                cursor: pointer;

                &:hover {
                    color: #004DFF;

                    svg {
                        fill: #004DFF;
                    }
                }

                svg {
                    fill: #333;
                    transition: fill 0.3s;
                }

                span {
                    font-size: 14px;
                }
            }

            .download-section {
                .download-btn {
                    display: flex;
                    align-items: center;
                    color: #004DFF;
                    border: 1px solid #004DFF;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-weight: normal;
                    text-decoration: none;
                    transition: all 0.3s;

                    &:hover {
                        background-color: #004DFF;
                        color: white;
                    }
                }
            }

            // 购物车
            .cart-section {
                .btn {
                    display: flex;
                    align-items: center;
                    position: relative;
                }

                @media screen and (max-width: @viewport-md) {
                    svg {
                        width: 25px;
                        height: 25px;
                    }

                    span {
                        display: none;
                    }
                }
            }

            // 搜索
            .search-section {
                border-right: 1px solid #999;
                padding-right: 20px;

                .search_warp {
                    display: flex;
                    align-items: center;

                    .ss_icon {
                        fill: #333;
                        transition: fill 0.3s;
                        width: 20px;
                        height: 20px;
                    }

                    &:hover .ss_icon {
                        fill: #004DFF;
                    }
                }
            }
        }

        .search-bar {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            padding: 0 15px;
            background-color: #fff;
            z-index: 1;
            transform: translateY(-100%);
            transition: transform 0.2s ease-in-out;
            opacity: 0;
            box-sizing: border-box;

            &.show {
                transform: translateY(0);
                opacity: 1;
            }

            .container {
                width: 94%;
                height: 100%;
                margin: 0 auto;
                display: flex;
                align-items: center;

                @media screen and (max-width: @viewport-md) {
                    width: 100%;
                }

                .input-container {
                    flex: 1;
                    display: flex;
                    align-items: center;

                    input {
                        height: 50px;
                        border: 0;
                        outline: 0;
                        box-shadow: none;
                        width: 100%;

                        padding: .375rem .75rem;
                        line-height: 1.5;
                        color: #495057;
                    }
                }
                .search-button {
                    width: 120px;
                    height: 38px;
                    outline: 0;
                    margin: 0px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 15px;
                    box-shadow: none;
                    border-radius: 55px;
                    margin-right: 5px;

                    @media screen and (max-width: @viewport-md) {
                        width: auto;
                        font-size: 14px;
                    }
                }
                .close-button {
                    color: #004DFF;
                    outline: 0;
                    margin: 0px;
                    box-shadow: none;
                    border: none;
                    background: #fff;
                    display: flex;
                    padding: 0;

                    svg {
                        width: 30px;

                        @media screen and (max-width: @viewport-md) {
                            width: 22px;
                        }
                    }
                }
            }
        }
    }

    // 响应式设计
    @media screen and (max-width: @viewport-md) {
        .main-header {
            .brand-section {
                flex: 0 0 auto;
                margin-right: 10px;

                .brand-logo img {
                    max-height: 40px;
                }
            }

            .mobile-menu-toggle {
                display: block;
                margin-left: auto;
            }

            .operations {
                gap: 10px;

                .search-section {
                    padding-right: 10px;
                }

                .download-section {
                    display: none;
                }
            }
        }
    }
</style>
