const isDev = process.env.NODE_ENV === 'development'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Automation-Automation-LD Plastic Solution Limited ',
            link: [
                {
                    rel: 'icon',
                    href: '/favicon.ico'
                }
            ],
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
                    // hid: 'description',
                    name: 'description',
                    content:
                      'Automation LD Plastic Solution Limited '
                },
                {
                    // hid: 'keywords',
                    name: 'keywords',
                    content:
                      ''
                }
            ]
        }
    },

    vite: {
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: '@import "~/assets/styles/var.less";'
                },
                scss: {
                    additionalData: '@use "~/assets/styles/element.scss";'
                }
            }
        },
        server: {
            // proxy: {
            //     '/profile/upload/': {
            //         target: 'http://154.23.132.24:8080', // 目标服务器的地址
            //         changeOrigin: true // 开启跨域
            //         // rewrite: path => path.replace(/^\/api/, '') // 去掉请求路径中的 '/api' 前缀
            //     },
            //     '/prod-api/': {
            //         target: 'http://154.23.132.24:8080', // 目标服务器的地址
            //         changeOrigin: true, // 开启跨域
            //         rewrite: path => path.replace(/^\/prod-api/, '') // 去掉请求路径中的 '/api' 前缀
            //     }
            // }
        }
    },

    serverHandlers: [
        {
            route: '/profile/upload/**:path',
            handler: '~/server/profileUploadHandler.ts'
        },
        {
            route: '/ipx/**:path',
            handler: '~/server/ipxHandler.ts'
        }
    ],

    nitro: {
        externals: {
            traceAlias: {
                '@sxzz/popperjs-es': '@popperjs/core'
            }
        }
    },

    routeRules: {
        '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } }
    },

    modules: ['@element-plus/nuxt', '@nuxtjs/i18n', '@nuxt/image'],

    elementPlus: {
        importStyle: 'scss'
    },

    i18n: {
        strategy: 'prefix',
        locales: [
            {
                code: 'en',
                name: 'English',
                language: 'en-US',
                file: 'en.json'
            },
            {
                code: 'zh',
                name: '中文',
                language: 'zh-CN',
                file: 'zh.json'
            }
        ],
        restructureDir: '',
        langDir: 'locales',
        defaultLocale: 'en',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root'
        }
    },

    css: ['normalize.css/normalize.css', '~/assets/styles/index.less'],

    image: {
        dir: 'assets/images',
        provider: 'proxy',
        providers: {
            proxy: {
                provider: 'ipx',
                options: {
                    baseURL: '/ipx'
                }
            }
        },
        twicpics: {
            baseURL: ''
        }
    }
})
