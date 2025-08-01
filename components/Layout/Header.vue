<template>
    <div class="header-container">
        <!-- 主导航栏 -->
        <div class="main-header">
            <div class="main-header-content">
                <!-- 品牌Logo区域 -->
                <div class="brand-section">
                    <div class="brand-logo">
                        <img src="~/assets/images/logo.png" alt="Logo" />
                    </div>
                </div>

                <!-- 导航菜单 -->
                <PCNav />

                <div class="operations">
                    <!-- 产品目录下载按钮 -->
                    <div class="download-section item">
                        <a class="download-btn" href="/download.html" target="_self">
                            <span>产品目录下载</span>
                        </a>
                    </div>

                    <!-- 购物车 -->
                    <div class="cart-section item">
                        <div class="e_productFloat s_list">
                            <div class="p_floatBtn js_editor_click">
                                <svg t="1727170418491" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9199" width="20" height="20">
                                    <path d="M939.643753 152.782448 735.998156 152.782448l0 0c-11.672034-0.947003-26.337077 5.916017-29.783087 20.825061l-35.212103 142.092416L84.311247 315.699925c-11.247033 0-20.36706 9.128027-20.36706 20.36706l0 20.36706c0 11.251033 9.119027 20.36206 20.36706 20.36206l571.547674 0-20.187059 81.460239L145.406426 458.256343c-11.247033 0-20.36706 9.109027-20.36706 20.36706l0 20.36206c0 11.257033 9.119027 20.36706 20.36706 20.36706l475.123392 0-20.185059 81.460239L206.500605 600.81276c-11.247033 0-20.36706 9.109027-20.36706 20.36206l0 20.36706c0 11.257033 9.119027 20.36706 20.36706 20.36706l414.961216 0c0 0 2.115006 0.107 0 0l0 0c11.751034 0 27.494081-5.819017 32.113094-21.929064l105.596309-426.101248 180.472529 0c11.247033 0 20.36206-9.109027 20.36206-20.36706l0-20.36706C960.005813 161.886474 950.890786 152.782448 939.643753 152.782448L939.643753 152.782448zM939.643753 152.782448" p-id="9200"></path>
                                    <path d="M574.086682 702.690059c-35.342104 0-64.000188 28.642084-64.000188 64.000188 0 35.342104 28.657084 64.000188 64.000188 64.000188 35.342104 0 64.000188-28.657084 64.000188-64.000188C638.087869 731.333143 609.428785 702.690059 574.086682 702.690059L574.086682 702.690059zM574.086682 702.690059" p-id="9201"></path>
                                    <path d="M253.594743 702.690059c-35.342104 0-64.000188 28.642084-64.000188 64.000188 0 35.342104 28.657084 64.000188 64.000188 64.000188s64.000188-28.657084 64.000188-64.000188C317.59493 731.333143 288.936846 702.690059 253.594743 702.690059L253.594743 702.690059zM253.594743 702.690059" p-id="9202"></path>
                                    <path d="M92.806272 429.91226c0.115 0.305001 0.243001 0.602002 0.385001 0.892003L92.806272 429.91226z" p-id="9203"></path>
                                    <path d="M155.912457 422.048236l0.031 0.146c-1.585005-3.612011-5.188015-6.138018-9.385027-6.138018l-44.167129 0c-5.661017 0-10.25003 4.589013-10.25003 10.25003 0 1.271004 0.242001 2.483007 0.665002 3.606011l0.385001 0.892003 93.306273 215.983633 56.969167-22.071065L155.912457 422.048236z" p-id="9204"></path>
                                </svg>
                                <span>购物车</span>
                            </div>
                            <div class="p_content">
                                <div class="p_arrow"></div>
                                <div class="p_select">
                                    <div class="p_close">关闭<div class="guanbi"></div></div>
                                    <div class="p_currenSelect">
                                        <span class="p_currentSpan js_editor_click">
                                            <span>订购</span>
                                            <svg t="1653966201259" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4836" width="20" height="20">
                                                <path d="M297.69350383 346.29910124L512 560.6055974 726.30649617 346.29910124a55.0126984 55.0126984 0 1 1 77.87942242 77.87942241L550.66354348 677.70089876a55.0126984 55.0126984 0 0 1-77.87942242 0L219.26174595 424.17852365c-10.49439069-10.49439069-16.01775312-24.30279805-16.01775442-38.66354347s6.07569919-28.72148955 16.01775442-39.21587894c21.54111683-20.98878007 56.89064234-21.54111683 78.43175788 0z" p-id="4837"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <ul class="p_selectList">
                                        <li key="zxxj" class="p_active p_selectItem">
                                            订购
                                            <input type="hidden" value="/Inquiry.html" target="_blank">
                                        </li>
                                    </ul>
                                </div>
                                <div class="p_list">
                                    <div class="p_empty">
                                        请选择内容
                                    </div>
                                </div>
                                <div class="p_btn">
                                    <span class="p_whole" txt="共 X 个">共 0 个</span>
                                    <a href="javascript:;" class="btn btn-link p_clear">清空全部内容</a>
                                    <a href="javascript:;" class="btn btn-primary p_confirmBtn">订购</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 搜索 -->
                    <div class="search-section item">
                        <div class="search_warp">
                            <svg t="1602919003135" class="ss_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9837" width="24" height="24">
                                <path d="M951.9 904.8l-152-162.5c61.8-74 95.6-167.4 95.5-263.9 0-228.3-186-414.1-414.5-414.1S66.5 250 66.5 478.4c0 228.4 186 414.1 414.5 414.1 59.2 0.1 117.8-12.6 171.7-37.1 16-7.3 23-26.2 15.7-42.2-7.3-16-26.2-23-42.2-15.7-108.5 49.2-234.6 40-334.8-24.5-100.2-64.5-160.9-175.4-161-294.6 0.3-193.5 157.2-350.2 350.7-350.3 193.4 0 350.8 157.2 350.8 350.3 0.1 90.5-34.9 177.5-97.8 242.6-12.2 12.7-11.8 32.8 0.9 45 1 1 2.2 1.3 3.3 2 0.9 1.3 1.3 2.7 2.5 4l164.9 176.3c12 12.8 32.1 13.5 45 1.5 12.6-12 13.2-32.2 1.2-45z m0 0" p-id="9838"></path>
                            </svg>
                        </div>
                    </div>

                    <!-- 语言选择 -->
                    <div class="language-section item">
                        <div class="language">
                            <div class="lang3">
                                <svg t="1680228126112" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2906" width="20" height="20">
                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 224c-29.5 0-58.3-2.6-86.2-7.5C452 175.3 491.4 120 512 120c20.6 0 60 55.3 86.2 160.5-27.9 4.8-56.7 7.5-86.2 7.5z m140.7-20.4c-13.6-55.7-31.8-102.6-53.1-137.4 63.6 14.6 121.3 44.7 169 86.1-35.3 21.8-74.3 39.1-115.9 51.3z m-281.4 0c-41.6-12.2-80.5-29.6-115.8-51.3 47.7-41.4 105.3-71.4 168.9-86-21.3 34.7-39.4 81.6-53.1 137.3zM679.5 484c-1.3-57.5-6.7-111.9-15.4-161.4 52.5-15 101.3-37.3 144.8-65.8 53.4 62 87.5 140.7 93.7 227.2H679.5z m-558.1 0c6.2-86.4 40.2-165.1 93.5-227.1 43.5 28.5 92.4 50.6 145 65.6-8.7 49.6-14.1 104-15.4 161.5H121.4z m279.1 0c1.3-55.7 6.4-105.4 13.9-148.7 31.6 5.6 64.1 8.7 97.6 8.7 33.4 0 66-3 97.6-8.6 7.5 43.3 12.5 93 13.9 148.6h-223z m408.4 283.2c-43.5-28.5-92.3-50.8-144.8-65.8 8.7-49.6 14.1-104 15.4-161.4h223.1c-6.2 86.5-40.3 165.2-93.7 227.2z m-394.5-78.5c-7.5-43.3-12.5-93-13.9-148.7h222.9c-1.3 55.6-6.3 105.3-13.9 148.6C578 683 545.4 680 512 680c-33.4 0-66 3.1-97.6 8.7zM215 767.1c-53.3-62-87.4-140.7-93.5-227.1h223.1c1.3 57.5 6.7 111.9 15.4 161.5-52.6 15-101.5 37.1-145 65.6zM512 904c-20.6 0-60-55.3-86.2-160.5 27.9-4.8 56.7-7.5 86.2-7.5s58.3 2.7 86.2 7.5C572 848.7 532.6 904 512 904z m87.6-10.2c21.3-34.8 39.5-81.7 53.1-137.4 41.7 12.2 80.6 29.5 115.9 51.2-47.7 41.5-105.4 71.6-169 86.2z m-175.2 0c-63.6-14.6-121.2-44.6-168.9-86 35.2-21.8 74.1-39.1 115.8-51.3 13.7 55.6 31.8 102.5 53.1 137.3z" p-id="2907"></path>
                                </svg>
                                <span>语言</span>
                            </div>
                            <ul class="lang4">
                                <li><a href="http://www.automation-ld.com">English</a></li>
                                <li><a href="http://es.automation-ld.com">Español</a></li>
                                <li><a href="http://cn.automation-ld.com">中文</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- 移动端菜单 -->
                    <MobileNav v-model:is-menu-open="isMobileMenuOpen" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import PCNav from './PCNav.vue'
    import MobileNav from './MobileNav.vue'

    const isMobileMenuOpen = ref(false)
</script>

<style scoped lang="less">
    .header-container {
        position: sticky;
        width: 100%;
        top: 0;
        z-index: 2003;
        background: #ffffff;
        box-shadow: 0 0 15px rgb(0 0 0 / 20%);
    }

    // 主导航栏
    .main-header {
        background: #ffffff;

        .main-header-content {
            max-width: 1200px;
            height: @header-height-pc;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            position: relative;
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

                img {
                    max-width: 102px;
                }
            }
        }

        .mobile-menu-toggle {
            display: none;
            cursor: pointer;
            padding: 10px;
            color: #333;

            &:hover {
                color: #007bff;
            }

            .menu-icon {
                font-size: 18px;
                font-weight: bold;
            }
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
                    margin-right: 5px;
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
                .e_productFloat {
                    position: relative;

                    .p_floatBtn {
                        display: flex;
                        align-items: center;
                    }

                    .p_content {
                        display: none;
                        position: absolute;
                        top: 100%;
                        right: 0;
                        width: 300px;
                        background: white;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        border-radius: 4px;
                        padding: 15px;
                        z-index: 100;
                        margin-top: 10px;

                        .p_arrow {
                            position: absolute;
                            top: -10px;
                            right: 20px;
                            width: 0;
                            height: 0;
                            border-left: 10px solid transparent;
                            border-right: 10px solid transparent;
                            border-bottom: 10px solid white;
                        }

                        .p_select {
                            border-bottom: 1px solid #eee;
                            margin-bottom: 10px;

                            .p_close {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                padding-bottom: 10px;

                                .guanbi {
                                    position: relative;
                                    width: 16px;
                                    height: 16px;
                                    cursor: pointer;

                                    &:before, &:after {
                                        content: "";
                                        position: absolute;
                                        width: 100%;
                                        height: 2px;
                                        background: #333;
                                        top: 50%;
                                        left: 0;
                                    }

                                    &:before {
                                        transform: rotate(45deg);
                                    }

                                    &:after {
                                        transform: rotate(-45deg);
                                    }
                                }
                            }

                            .p_currenSelect {
                                padding: 10px 0;
                                cursor: pointer;

                                .p_currentSpan {
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                }
                            }

                            .p_selectList {
                                display: none;
                                list-style: none;
                                padding: 0;
                                margin: 0;

                                .p_selectItem {
                                    padding: 10px 0;
                                    cursor: pointer;

                                    &:hover {
                                        color: #004DFF;
                                    }

                                    &.p_active {
                                        color: #004DFF;
                                    }
                                }
                            }
                        }

                        .p_list {
                            min-height: 100px;

                            .p_empty {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100px;
                                color: #999;
                            }
                        }

                        .p_btn {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 10px;

                            .p_whole {
                                font-size: 14px;
                                color: #666;
                            }

                            .p_clear {
                                color: #666;
                                text-decoration: none;

                                &:hover {
                                    color: #004DFF;
                                }
                            }

                            .p_confirmBtn {
                                background: #004DFF;
                                color: white;
                                padding: 5px 15px;
                                border-radius: 4px;
                                text-decoration: none;

                                &:hover {
                                    background: darken(#004DFF, 10%);
                                }
                            }
                        }
                    }

                    &:hover .p_content {
                        display: block;
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
                    }

                    &:hover .ss_icon {
                        fill: #004DFF;
                    }
                }
            }

            // 语言选择
            .language-section {
                .language {
                    position: relative;

                    .lang3 {
                        display: flex;
                        align-items: center;
                    }

                    .lang4 {
                        display: none;
                        position: absolute;
                        top: 100%;
                        right: 0;
                        background: white;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        border-radius: 4px;
                        padding: 10px 0;
                        margin-top: 10px;
                        z-index: 100;
                        width: 120px;
                        list-style: none;

                        li {
                            padding: 8px 15px;

                            a {
                                color: #333;
                                text-decoration: none;
                                transition: color 0.3s;
                                display: block;

                                &:hover {
                                    color: #004DFF;
                                }
                            }
                        }
                    }

                    &:hover .lang4 {
                        display: block;
                    }
                }
            }
        }
    }

    // 响应式设计
    @media screen and (max-width: @viewport-md) {
        .main-header {
            .main-header-content {
                height: @header-height-mobile;
            }
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

                .download-section,
                .cart-section {
                    display: none;
                }
            }
        }
    }
</style>
