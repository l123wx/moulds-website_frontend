<template>
    <div>
        <div style="padding-top: 5px;">
            <Breadcrumb :breadcrumb-list="breadcrumbList" :breadcrumb-pending="false" />
        </div>
        <div id="blog-list-container" class="response-animated">
            <div class="e_loop s_list response-transition">
                <div class="">
                    <div class="p_list">
                        <el-skeleton :loading="pending" :count="2" :throttle="{ leading: 500, trailing: 500 }" animated :title="false">
                            <template #default>
                                <div v-for="(article, index) in articleList" :key="index" class="cbox-5 p_loopitem">
                                    <div class="e_container s_layout response-transition">
                                        <div class="cbox-6-0 p_item">
                                            <div class="e_image s_img">
                                                <NuxtLinkLocale :to="article.link">
                                                    <NuxtImg loading="lazy" :src="article.imagePath" :alt="article.title" :title="article.title" />
                                                </NuxtLinkLocale>
                                            </div>
                                        </div>
                                        <div class="cbox-6-1 p_item">
                                            <p class="e_timeFormat s_title">{{ formatDate(article.createTime) }}</p>
                                            <h3 class="e_h3-8 s_summary">
                                                <NuxtLinkLocale :to="article.link">
                                                    {{ article.title }}
                                                </NuxtLinkLocale>
                                            </h3>
                                            <hr class="e_line">
                                            <div class="e_richText s_title clearfix response-transition">
                                                {{ article.description }}
                                            </div>
                                            <NuxtLinkLocale class="e_button s_button1 btn btn-primary response-transition" :to="article.link">
                                                <span>了解更多</span>
                                            </NuxtLinkLocale>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #template>
                                <div class="cbox-5 p_loopitem">
                                    <div class="e_container s_layout response-transition">
                                        <div class="cbox-6-0 p_item">
                                            <div class="e_image s_img">
                                                <el-skeleton-item variant="image" style="position: absolute; width: 100%; height: 100%;" />
                                            </div>
                                        </div>
                                        <div class="cbox-6-1 p_item">
                                            <p class="e_timeFormat s_title">
                                                <el-skeleton-item variant="text" style="width: 100%;" />
                                            </p>
                                            <h3 class="e_h3-8 s_summary">
                                                <el-skeleton-item variant="text" style="width: 100%;" />
                                            </h3>
                                            <hr class="e_line s_line">
                                            <div class="e_richText s_title clearfix response-transition">
                                                <el-skeleton-item v-for="i in 3" :key="i" variant="text" style="width: 100%;" />
                                            </div>
                                            <el-skeleton-item variant="button" style="margin-top: 20px;" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-skeleton>
                    </div>
                </div>
                <div class="pagination-container">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="pageSize"
                        :current-page="pageNum"
                        @current-change="handlePageChange"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import dayjs from 'dayjs'
    import { NuxtLinkLocale } from '#components'
    import Breadcrumb from '~/components/Layout/Breadcrumb.vue'
    import getArticleListByArticleTypeSlug from '~/http/apis/getArticleListByArticleTypeSlug'
    import useRoutePath from '~/hooks/useRoutePath'

    const { articleDetailPath } = useRoutePath()
    const { locale } = useI18n()

    definePageMeta({
        layout: 'about-us'
    })

    const ACTIVE_PAGE_SLUG = 'blogs'

    const breadcrumbList = ref([
        {
            label: 'About Us'
        },
        {
            label: 'Blogs'
        }
    ])

    // 假设博客属于某个栏目，这里使用一个栏目ID
    const pageSize = 6
    const pageNum = ref(1)

    const { data, pending, refresh } = useAsyncData(
        'blogList_' + ACTIVE_PAGE_SLUG,
        () => getArticleListByArticleTypeSlug(ACTIVE_PAGE_SLUG, pageNum.value, pageSize, locale.value),
        {
            default: () => ({
                rows: [],
                total: 0
            })
        }
    )

    const articleList = computed(() => {
        return data.value?.rows?.map(article => ({
            ...article,
            link: articleDetailPath(article.slug)
        }))
    })

    const total = computed(() => data.value?.total)

    const formatDate = (date: string) => {
        if (!date) { return '' }
        return dayjs(date).locale(locale.value === 'zh' ? 'zh-cn' : locale.value).format('MMM DD,YYYY')
    }

    const handlePageChange = (page: number) => {
        pageNum.value = page
        refresh()
    }
</script>

<style scoped lang="less">
    .page-title {
        font-size: 32px;
        color: rgba(34, 34, 34, 1);
        line-height: 1.5;
        text-align: left;
        font-weight: bold;
        padding-top: 0px;
        margin-top: 30px;
        margin-bottom: 20px;
    }

    #blog-list-container {
        min-height: 300px;
        margin-bottom: 50px;
    }

    .e_loop {
        display: block;
        max-width: 1300px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
        margin-bottom: 0px;

        .p_list {
            display: flex;
            flex-wrap: wrap;
            position: relative;
            max-width: 100%;
        }

        .p_loopitem {
            flex: 0 0 33.3%;
            position: relative;

            @media screen and (max-width: 768px) {
                flex-grow: 0;
                flex-shrink: 0;
                flex-basis: calc(100% / 1);
            }

            @media screen and (min-width: 769px) {
                flex-grow: 0;
                flex-shrink: 0;
                flex-basis: calc(100% / 1);

                @media screen and (max-width: 1024px) {
                    // 可添加平板设备的特定样式
                }
            }

            &:hover {
                img {
                    transform: scale(1.1);
                }

                .e_button {
                    border-color: #004DFF;
                    background-color: #004DFF;
                    color: rgba(255,255,255,1);
                }
            }
        }
    }

    .e_container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        width: 100%;
        margin-bottom: 6%;

        .cbox-6-1 {
            padding-left: 5%;
        }

        @media screen and (max-width: @viewport-sm) {
            display: block;
            .cbox-6-1 {
                padding-left: 0;
            }
        }

        > .p_item {
            flex: 1;
            max-width: 100%;
            max-height: 100%;

            &.cbox-6-0 {
                flex: 0 0 31%;
                display: flex;
                align-items: center;
            }
        }
    }

    .e_image {
        overflow: hidden;
        display: block;
        position: relative;
        padding-bottom: 56%;
        width: 100%;
        height: 0;

        img {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
            object-fit: cover;
            transition: all 600ms ease;
        }
    }

    .e_h3-8 {
        font-size: 18px;
        color: rgba(0,0,0,1);
        font-weight: bold;
    }

    .e_richText {
        font-size: 14px;
        color: rgba(102,102,102,1);
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .e_button {
        display: block;
        position: relative;
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        width: 119px;
        padding: 8px;
        color: rgba(102,102,102,1);
        border-color: rgba(153,153,153,1);
        border-style: solid;
        border-width: 1px;
        font-size: 14px;
        background-color: rgba(255, 255, 255, 1);
        margin-right: 0px;
        margin-left: 0px;
        margin-top: 20px;

        span {
            display: block;
            width: 100%;
            position: relative;
            z-index: 1;
            outline: 0;
            margin: 0px;
            overflow: hidden;
        }

        &::after {
            content: "";
            position: absolute;
            width: 0;
            height: 100%;
            transition: all .3s;
            z-index: 0;
            opacity: 0;
            top: 0;
            left: 0px;
        }

        &:hover {
            border-color: #004DFF;
            background-color: #004DFF;
            color: rgba(255,255,255,1);

            &::after {
                opacity: 1;
            }
        }
    }

    .e_line {
        width: 50px;
        margin: 5px 0;
        height: 2px;
        border-top-style: solid;
        border-top-width: 2px;
        border-top-color: rgba(0,77,255,1);
    }

    .e_timeFormat {
        min-height: 20px;
        font-size: 14px;
        font-weight: normal;
        color: rgba(0,77,255,1);
        margin-bottom: 15px;
    }

    .pagination-container {
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }
</style>
