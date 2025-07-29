<template>
    <div>
        <Banner :zh="columnInfo?.categoryName" :en="columnInfo?.categoryEnglishName" />
        <div class="container">
            <div v-if="error">{{ $t('http.error') }}</div>
            <template v-else>
                <el-breadcrumb :separator-icon="ArrowRight" style="transform: translateY(-24px)">
                    <el-breadcrumb-item :to="localePath('/')">{{ $t('home') }}</el-breadcrumb-item>
                    <el-breadcrumb-item
                        v-if="columnInfo?.categoryName"
                        :to="localePath('/article/list/' + columnId)"
                    >
                        {{ $tt(columnInfo.categoryName, columnInfo.categoryEnglishName) }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <el-skeleton v-if="pending" :rows="5" style="padding: 20px 0" />
                <template v-else>
                    <ul v-if="articleList && articleList.length" class="article-list">
                        <li v-for="article in articleList" :key="article.articleId">
                            <a
                                :href="article.type === 0 ? localePath(`/article/${article.articleId}`) : article.link"
                                class="article-item"
                            >
                                <NuxtImg
                                    v-if="article?.articleTitleImage"
                                    :src="article.articleTitleImage"
                                    :alt="(article.articleTitle || '') + ' image'"
                                    provider="twicpics"
                                    loading="lazy"
                                    placeholder
                                />
                                <div class="content">
                                    <div>
                                        <div class="title">
                                            {{ article.articleTitle || '' }}
                                        </div>
                                        <div class="desc">
                                            {{ article.articleBrief || '' }}
                                        </div>
                                    </div>
                                    <div class="bottom">
                                        <div class="source"> 来源: {{ article.articleFrom || '未知' }} </div>
                                        <div class="time">
                                            {{ dayjs(article.articleTime).format('YYYY-MM-DD') }}
                                        </div>
                                    </div>
                                </div>
                                <div class="time">
                                    <div class="month-and-day">
                                        {{ dayjs(article.articleTime).format('MM-DD') }}
                                    </div>
                                    <div class="year">{{
                                        dayjs(article.articleTime).format('YYYY')
                                    }}</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <el-empty v-else />
                </template>
                <el-pagination
                    v-model:current-page="pageNum"
                    class="pagination"
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :total="total"
                    @update:current-page="() => refresh()"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import dayjs from 'dayjs'

    import { ArrowRight } from '@element-plus/icons-vue'
    import Banner from '~/components/Article/Banner.vue'
    import getArticleListByColumnId from '~/http/apis/getArticleListByColumnId'
    import getColumnById from '~/http/apis/getColumnById'
    import useI18n from '~/hooks/useI18n'

    const { $tt } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const localePath = useLocalePath()

    const pageSize = 10

    const columnId = route.params.id
    if (!columnId) {
        router.push('/404')
    }

    const pageNum = ref(1)

    const { data, pending, refresh, error } = useAsyncData(
        'articleList_' + columnId,
        () =>
            getArticleListByColumnId(Number(columnId), {
                pageNum: pageNum.value,
                pageSize
            }),
        {
            default: () => {}
        }
    )

    const articleList = computed(() => data.value?.rows || [])
    const total = computed(() => data.value?.total || 0)

    const { data: columnInfo } = useAsyncData(
        'column_' + columnId,
        () => getColumnById(Number(columnId)),
        {
            transform: data => data.data,
            default: () => {}
        }
    )
</script>

<style scoped lang="less">
    .container {
        max-width: @page-content-max-width;
        margin: 0 auto;
        padding: 50px 100px;
        box-sizing: border-box;

        @media screen and (max-width: @viewport-md) {
            padding: 50px 18px;
            margin: 0 auto;
        }
    }

    .article-list {
        padding: 0;
        margin: 0;
        li {
            display: block;
            & + li {
                border-top: 1px solid #e2e2e2;
            }
        }
    }
    .article-item {
        display: flex;
        gap: 30px;
        align-items: center;
        padding: 32px 0;
        width: 100%;
        @media screen and (max-width: @viewport-md) {
            gap: 16px;
            padding: 20px 0;
        }
        &:hover {
            .content .title {
                color: @main-color;
            }
        }
        img {
            border-radius: 8px;
            height: 200px;
            width: 341px;
            object-fit: cover;
            @media screen and (max-width: @viewport-lg) {
                height: 176px;
                width: 300px;
            }
            @media screen and (max-width: @viewport-md) {
                height: 88px;
                width: 150px;
            }
        }
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-self: stretch;
            overflow: hidden;
            gap: 20px;
            .title {
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 20px;
                line-height: 28px;
                white-space: nowrap;
                @media screen and (max-width: @viewport-md) {
                    font-size: 18px;
                    color: #222;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    white-space: unset;
                }
            }
            .desc {
                color: #555;
                font-size: 16px;
                line-height: 26px;
                margin-top: 23px;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                display: -webkit-box;
                @media screen and (max-width: @viewport-md) {
                    display: none;
                }
            }
            .bottom {
                display: flex;
                gap: 20px;
                .time {
                    display: none;
                    color: #555;
                    font-size: 14px;
                    @media screen and (max-width: @viewport-lg) {
                        display: block;
                    }
                }
                .source {
                    color: #555;
                    @media screen and (max-width: @viewport-sm) {
                        display: none;
                    }
                }
            }
        }
        > .time {
            text-align: right;
            @media screen and (max-width: @viewport-lg) {
                display: none;
            }
            .month-and-day {
                color: #888;
                font-size: 28px;
                line-height: 37px;
            }
            .year {
                color: #888;
                font-size: 16px;
                line-height: 21px;
                margin-top: 10px;
                padding-top: 16px;
                position: relative;
                &::before {
                    background: #d8d8d8;
                    content: ' ';
                    height: 3px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 32px;
                }
            }
        }
    }

    .pagination {
        justify-content: center;
        padding: 50px;
    }
</style>
