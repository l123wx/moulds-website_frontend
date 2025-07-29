// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: '2023世界储能大会',
            meta: [
                { charset: 'utf-8' },
                { name: 'apple-mobile-web-app-capable', content: 'yes' }, // iOS浏览器禁止缩放
                {
                    name: 'viewport',
                    content:
                        'width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
                },
                { name: 'renderer', content: 'webkit' }, // 强制让360浏览器使用Webkit内核
                { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        '储能是应对全球气候变化、促进能源转型的关键支撑技术。为打造全球首个世界级储能交流合作平台，推动储能行业持续健康发展，2023世界储能大会拟于11月8日-10日在福建省宁德市举办。大会以“全球视野 全新储能”为主题，突出经贸合作，举办开幕式暨主论坛、主题论坛、特色活动等，拟邀请政府间国际组织代表，有关国家部委、地方政府，全球知名专家学者、行业协会代表、储能产业链重点企业和应用企业代表等汇聚一堂，共话市场形势，共研技术趋势，共谋产业路径，共促高质量发展。'
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '2023世界储能大会, 储能大会, World Energy Storage Conference 2023, 福建省宁德市, 福建省宁德市人民政府, 福建省工业和信息化厅, 工信部装备工业发展中心, 福建省宁德市·佰翔三都澳国际会议中心, 2023年11月8日'
                }
            ]
        }
    },
    vite: {
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: '@import "~/assets/styles/var.less";'
                }
            }
        },
        server: {
            proxy: {
                '/profile/upload/': {
                    target: 'http://154.23.132.24:8080', // 目标服务器的地址
                    changeOrigin: true // 开启跨域
                    // rewrite: path => path.replace(/^\/api/, '') // 去掉请求路径中的 '/api' 前缀
                },
                '/prod-api/': {
                    target: 'http://154.23.132.24:8080', // 目标服务器的地址
                    changeOrigin: true, // 开启跨域
                    rewrite: path => path.replace(/^\/prod-api/, '') // 去掉请求路径中的 '/api' 前缀
                }
            }
        }
    },
    modules: ['@element-plus/nuxt', '@nuxtjs/i18n', '@nuxt/image'],
    i18n: {
        vueI18n: './i18n.config.ts',
        locales: ['zh', 'en'],
        defaultLocale: 'zh'
    },
    css: ['normalize.css/normalize.css', '~/assets/styles/index.less'],
    image: {
        dir: 'assets/images',
        twicpics: {
            baseURL: ''
        }
    }
})
