<template>
    <div>
        <div class="container">
            <div v-if="error">{{ $t('http.error') }}</div>
            <template v-else>
                <el-breadcrumb :separator-icon="ArrowRight" style="transform: translateY(-24px)">
                    <el-breadcrumb-item :to="localePath(homePath)">{{ $t('home') }}</el-breadcrumb-item>
                    <el-breadcrumb-item :to="localePath(blogsPath)">Blogs</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ article?.title || '' }}</el-breadcrumb-item>
                </el-breadcrumb>
                <el-skeleton v-if="pending" :rows="5" />
                <div v-else>
                    <div class="header">
                        <div class="title">{{ article?.title || '' }}</div>
                        <div class="time">
                            {{ dayjs(article?.createTime).locale($i18n.locale === 'zh' ? 'zh-cn' : 'en').format('MMM DD, YYYY') }}
                        </div>
                    </div>
                    <div class="content">
                        <div v-html="article?.content"></div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ArrowRight } from '@element-plus/icons-vue'
    import dayjs from 'dayjs'
    import 'dayjs/locale/zh-cn'
    import useTinyMCEStyle from '~/hooks/useTinyMCEStyle'
    import getArticleDetailBySlug from '~/http/apis/getArticleDetailBySlug'
    import useRoutePath from '~/hooks/useRoutePath'

    const { homePath, blogsPath } = useRoutePath()
    const { locale } = useI18n()

    useTinyMCEStyle()

    const route = useRoute()
    const router = useRouter()
    const localePath = useLocalePath()

    const articleSlug = route.params.slug as string

    if (!articleSlug) {
        router.push('/404')
    }

    const {
        data: article,
        pending,
        error
    } = useAsyncData(
        'getArticleDetailBySlug_' + articleSlug,
        () => getArticleDetailBySlug(articleSlug, locale.value),
        {
            transform: (data) => data.data
        }
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
    }
</style>
