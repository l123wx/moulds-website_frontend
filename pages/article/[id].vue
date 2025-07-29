<template>
    <div>
        <Banner :zh="article?.categoryName" :en="article?.categoryEnglishName" />
        <div class="container">
            <div v-if="error">{{ $t('http.error') }}</div>
            <template v-else>
                <el-breadcrumb :separator-icon="ArrowRight" style="transform: translateY(-24px)">
                    <el-breadcrumb-item :to="localePath('/')">{{ $t('home') }}</el-breadcrumb-item>
                    <el-breadcrumb-item
                        v-if="article?.categoryName"
                        :to="localePath('/article/list/' + article.categoryId)"
                    >
                        {{ $tt(article.categoryName, article.categoryEnglishName) }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <el-skeleton v-if="pending" :rows="5" />
                <div v-else>
                    <div class="header">
                        <div class="title">{{ article?.articleTitle || '' }}</div>
                        <div class="time">
                            发布日期: {{ dayjs(article.articleTime).format('YYYY-MM-DD') }}
                        </div>
                    </div>
                    <div class="content">
                        <div v-html="article.articleContent"></div>
                    </div>
                    <div v-if="article.articleFrom" class="source">
                        来源：{{ article.articleFrom }}
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ArrowRight } from '@element-plus/icons-vue'
    import dayjs from 'dayjs'
    import Banner from '~/components/Article/Banner.vue'
    import getArticleById from '~/http/apis/getArticleById'
    import getColumnById from '~/http/apis/getColumnById'
    import useI18n from '~/hooks/useI18n'

    useHead({
        link: [
            {
                rel: 'stylesheet',
                href: '/content.min.css'
            }
        ]
    })

    const route = useRoute()
    const router = useRouter()
    const localePath = useLocalePath()
    const { $tt } = useI18n()

    const articleId = route.params.id

    if (!articleId) {
        router.push('/404')
    }

    const {
        data: article,
        pending,
        error
    } = useAsyncData(
        'article_' + articleId,
        () =>
            new Promise<any>((resolve, reject) => {
                getArticleById(Number(articleId))
                    .then(res => {
                        const result = res?.data || {}
                        getColumnById(result.articleFatherColumn)
                            .then(sRes => {
                                const sResult = sRes?.data || {}
                                resolve({
                                    ...result,
                                    ...sResult
                                })
                            })
                            .catch(err => reject(err))
                    })
                    .catch(err => reject(err))
            })
    )
</script>

<style scoped lang="less">
    .container {
        max-width: @page-content-max-width;
        margin: 35px auto;
        background-color: #ffffff;
        box-shadow: 0 0 12px 3px rgba(0, 0, 0, 0.04);
        padding: 50px 100px;
        box-sizing: border-box;

        :deep(a) {
            color: revert;
            text-decoration: revert;
        }

        @media screen and (max-width: @viewport-md) {
            padding: 50px 18px;
            margin: 0 auto;
        }

        .header {
            border-bottom: 1px solid #efefef;

            .title {
                color: #222;
                font-size: 24px;
                font-weight: 600;
                line-height: 1.5;
                margin-bottom: 20px;
                text-align: center;
            }

            .time {
                color: #999;
                font-size: 14px;
                font-weight: 400;
                line-height: 22px;
                margin-bottom: 24px;
                text-align: center;
            }
        }

        .content {
            padding: 30px 0;

            :deep(img) {
                max-width: 100%;
            }
        }

        .source {
            border-top: 1px solid #efefef;
            padding-top: 20px;
            font-size: 14px;
        }
    }
</style>
