<template>
    <div class="container">
        <div class="title">
            {{ $t('news') }}
            <NuxtLinkLocale :to="`/article/list/8`">
                {{ $t('more') }}
                <el-icon><ArrowRight /></el-icon>
            </NuxtLinkLocale>
        </div>
        <div v-if="error">{{ $t('http.error') }}</div>
        <template v-else>
            <el-skeleton v-if="pending" :rows="5" style="padding: 20px 0" />
            <ul v-else class="list">
                <li v-for="article in articleList" :key="article.articleId" class="item">
                    <NuxtLinkLocale :to="article.type === 0 ? ('/article/' + article.articleId) : article.link">
                        <NuxtImg
                            :src="article.articleTitleImage || placeholderImg"
                            :alt="article.articleTitle + ' image'"
                            provider="twicpics"
                            loading="lazy"
                            placeholder
                        />
                        <div class="content">
                            <div class="time">
                                {{ dayjs(article.articleTime).format('YYYY-MM-DD') }}
                            </div>
                            <div class="title">{{ article.articleTitle }}</div>
                            <div class="intro">
                                {{ article.articleBrief }}
                            </div>
                        </div>
                    </NuxtLinkLocale>
                </li>
            </ul>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { ArrowRight } from '@element-plus/icons-vue'
    import dayjs from 'dayjs'

    import getReCommendedArticleList from '~/http/apis/getReCommendedArticleList'
    import placeholderImg from '~/assets/images/video-poster.jpg?url'

    const {
        data: articleList,
        pending,
        error
    } = useAsyncData(
        'getReCommendedArticleList',
        () =>
            getReCommendedArticleList({
                pageNum: 1,
                pageSize: 4
            }),
        {
            transform: data => data?.rows || [],
            default: () => []
        }
    )
</script>

<style scoped lang="less">
    .container {
        max-width: @page-content-max-width;
        margin: 35px auto;
        padding: 0 30px;
        @media screen and (max-width: @viewport-md) {
            padding: 0 18px;
        }
        > .title {
            margin-bottom: 10px;
            font-size: 24px;
            display: flex;
            justify-content: space-between;
            @media screen and (max-width: @viewport-md) {
                font-size: 18px;
            }
            a {
                font-size: 16px;
                display: flex;
                align-items: center;
            }
        }
    }
    .list {
        display: flex;
        padding: 0;
        margin: 0;
        gap: 20px;
        @media screen and (max-width: @viewport-md) {
            gap: 0;
            flex-direction: column;
        }
        .item {
            display: inline-block;
            flex: 1;
            padding: 15px 0;
            @media screen and (max-width: @viewport-md) {
                & + .item {
                    border-top: 1px solid #eeeeee;
                }
            }
            &:hover .title {
                color: @main-color;
            }
            a {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                max-width: 300px;
                @media screen and (max-width: @viewport-md) {
                    max-width: unset;
                    flex-direction: row;
                    gap: 20px;
                }
            }
            img {
                height: 200px;
                width: 100%;
                object-fit: cover;
                flex-shrink: 0;
                @media screen and (max-width: @viewport-xl) {
                    height: 150px;
                }
                @media screen and (max-width: @viewport-lg) {
                    height: 130px;
                }
                @media screen and (max-width: @viewport-md) {
                    height: 110px;
                    width: 180px;
                }
                @media screen and (max-width: @viewport-sm) {
                    height: 100px;
                    width: 150px;
                }
            }
            .time {
                display: flex;
                align-items: center;
                color: #888888;
                font-size: 18px;
                padding: 14px 0;
                &::before {
                    display: block;
                    content: '';
                    background: #888888;
                    width: 25px;
                    height: 2px;
                    margin-right: 10px;
                    @media screen and (max-width: @viewport-md) {
                        width: 10px;
                        margin-right: 6px;
                    }
                }
                @media screen and (max-width: @viewport-md) {
                    padding: 5px 0;
                }
                @media screen and (max-width: @viewport-sm) {
                    font-size: 14px;
                }
            }
            .content {
                flex: 1;
                .title {
                    font-size: 21px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    white-space: unset;
                    height: 50px;
                    @media screen and (max-width: @viewport-md) {
                        height: unset;
                        -webkit-line-clamp: 3;
                        font-size: 18px;
                    }
                    @media screen and (max-width: @viewport-sm) {
                        font-size: 16px;
                    }
                }
                .intro {
                    font-size: 14px;
                    color: #333333;
                    padding-top: 10px;
                    line-height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 4;
                    white-space: unset;
                    @media screen and (max-width: @viewport-md) {
                        display: none;
                    }
                }
            }
        }
    }
</style>
