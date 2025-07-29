<template>
    <div class="container">
        <NuxtImg
            :src="footerBgImage"
            provider="twicpics"
            loading="lazy"
            placeholder
            class="background"
        />
        <div class="nav">
            <div v-if="error">{{ $t('http.error') }}</div>
            <template v-else>
                <div v-for="menu in menuTreeList" :key="menu.menuId">
                    <div class="title">
                        <NuxtLinkLocale :to="menu.routerLink || ''">
                            {{ $tt(menu.name, menu.englishName) }}
                        </NuxtLinkLocale>
                    </div>
                    <ul>
                        <li v-for="subColumn in menu.children" :key="subColumn.menuId">
                            <NuxtLinkLocale :to="subColumn.routerLink || ''">
                                {{ $tt(subColumn.name, subColumn.englishName) }}
                            </NuxtLinkLocale>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
        <div class="organizer">
            <div>
                <div>主办单位</div>
                <div class="list">
                    <div>福建省宁德市人民政府</div>
                    <div>福建省工业和信息化厅</div>
                    <div>工信部装备工业发展中心</div>
                </div>
            </div>
            <div>福建 · 宁德 2023.11.8-10</div>
        </div>
        <NuxtLink class="copyright" to="https://beian.miit.gov.cn/">闽ICP备09016467号</NuxtLink>
    </div>
</template>

<script setup lang="ts">
    import footerBgImage from '~/assets/images/footer-background.webp?url'

    import getAllMenu from '~/http/apis/getAllMenu'
    import { handconstree } from '~/utils'

    import useI18n from '~/hooks/useI18n'

    const { $tt } = useI18n()

    const { data: menuTreeList, error } = useAsyncData(() => getAllMenu(), {
        transform: data => {
            const result = handconstree(data.rows, 'menuId', 'parentId')
            return result.filter(item => item.name !== '首页')
        },
        default: () => []
    })
</script>

<style scoped lang="less">
    .container {
        position: relative;
        display: flex;
        .background {
            width: 100%;
            min-height: 560px;
            object-position: right;
            object-fit: cover;
            @media screen and (max-width: @viewport-sm) {
                min-height: 620px;
            }
        }
        .nav {
            max-width: 1000px;
            width: 100%;
            padding: 0 50px;
            box-sizing: border-box;
            color: #ffffff;
            position: absolute;
            left: 50%;
            top: 25%;
            transform: translateX(-50%);
            display: flex;
            justify-content: space-between;
            gap: 20px;
            .title {
                font-size: 18px;
                font-weight: bold;
                a {
                    color: #ffffff;
                }
            }
            ul {
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                margin-top: 20px;
                gap: 16px;
            }
            li {
                display: inline-block;
                a {
                    color: #ffffff;
                    font-size: 18px;
                }
            }
        }
        .organizer {
            display: none;
            position: absolute;
            left: 50%;
            top: 50px;
            transform: translateX(-50%);
            width: 100%;
            box-sizing: border-box;
            padding: 20px;
            flex-direction: column;
            text-align: center;
            color: #ffffff;
            font-size: 18px;
            gap: 50px;
            .list {
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
                margin-top: 26px;
            }
        }
        .copyright {
            color: #ffffff;
            position: absolute;
            width: 100%;
            text-align: center;
            bottom: 50px;
        }

        @media screen and (max-width: @viewport-lg) {
            .nav {
                display: none;
            }
            .organizer {
                display: flex;
            }
        }
    }
</style>
