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
                <Nav ref="navRef" v-model:mobile-menu-open="mobileMenuOpen" />

                <!-- 产品目录下载按钮 -->
                <div class="download-section">
                    <a href="#" class="download-btn">产品目录下载</a>
                </div>

                <!-- 移动端菜单按钮
                <div class="mobile-menu-toggle" @click="onToggleMobileMenu">
                    <span class="menu-icon">☰</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Nav from './Nav.vue'

    const mobileMenuOpen = ref(false)
    const navRef = ref<InstanceType<typeof Nav> | null>(null)

    // 注释掉不使用的方法，在需要时可以取消注释
    /*
    const onToggleMobileMenu = () => {
        if (navRef.value) {
            navRef.value.toggleMobileMenu()
        }
    }
    */

    // // 关闭移动端菜单当点击外部时
    // onMounted(() => {
    //     document.addEventListener('click', (e) => {
    //         if (!e.target.closest('.main-navigation') && !e.target.closest('.mobile-menu-toggle')) {
    //             mobileMenuOpen.value = false
    //         }
    //     })
    // })
</script>

<style scoped lang="less">
    .header-container {
        position: sticky;
        width: 100%;
        top: 0;
        z-index: 1000;
        background: #ffffff;
        box-shadow: 0 0 15px rgb(0 0 0 / 20%);
    }

    // 主导航栏
    .main-header {
        background: #ffffff;

        .main-header-content {
            max-width: 1200px;
            width: 94%;
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

        .download-section {
            .download-btn {
                background: #007bff;
                color: #ffffff;
                padding: 10px 20px;
                border-radius: 4px;
                text-decoration: none;
                font-size: 14px;
                transition: background 0.3s;

                &:hover {
                    background: #0056b3;
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
            }

            .download-section {
                display: none;
            }
        }
    }
</style>
