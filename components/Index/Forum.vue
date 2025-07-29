<template>
    <div class="container">
        <div class="title">
            <div class="zh">主题论坛</div>
            <div class="en">Theme Forum</div>
        </div>
        <ul>
            <li>
                <NuxtImg
                    :src="forumImage1"
                    provider="twicpics"
                    loading="lazy"
                    placeholder
                    alt="forumImage1"
                />
                <div class="content">
                    <div>
                        <div class="time">
                            <div class="date">11.9</div>
                            <div class="time-bucket">14:30-17:10</div>
                        </div>
                        <div class="title">全球视野下的储能市场、政策与环境</div>
                    </div>
                    <NuxtLinkLocale to="/article/14">
                        详情
                        <el-icon><Right /></el-icon>
                    </NuxtLinkLocale>
                </div>
            </li>
            <li>
                <NuxtImg
                    :src="forumImage2"
                    provider="twicpics"
                    loading="lazy"
                    placeholder
                    alt="forumImage2"
                />
                <div class="content">
                    <div>
                        <div class="time">
                            <div class="date">11.10</div>
                            <div class="time-bucket">09:00-10:45</div>
                        </div>
                        <div class="title">技术驱动，创新储能</div>
                    </div>
                    <NuxtLinkLocale to="/article/15">
                        详情
                        <el-icon><Right /></el-icon>
                    </NuxtLinkLocale>
                </div>
            </li>
            <li>
                <NuxtImg
                    :src="forumImage3"
                    provider="twicpics"
                    loading="lazy"
                    placeholder
                    alt="forumImage3"
                />
                <div class="content">
                    <div>
                        <div class="time">
                            <div class="date">11.10</div>
                            <div class="time-bucket">10:45-12:10</div>
                        </div>
                        <div class="title">储能的全新场景和应用</div>
                    </div>
                    <NuxtLinkLocale to="/article/16">
                        详情
                        <el-icon><Right /></el-icon>
                    </NuxtLinkLocale>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { Right } from '@element-plus/icons-vue'

    import forumImage1 from '~/assets/images/forum1.webp?url'
    import forumImage2 from '~/assets/images/forum2.webp?url'
    import forumImage3 from '~/assets/images/forum3.webp?url'
</script>

<style scoped lang="less">
    .container {
        max-width: @page-content-max-width;
        margin: 50px auto;
        padding: 0 30px;
        display: flex;
        gap: 30px;
        justify-content: space-between;
        @media screen and (max-width: 1125px) {
            flex-direction: column;
        }
        @media screen and (max-width: @viewport-md) {
            padding: 0 18px;
        }
        > .title {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 40px;
            .zh {
                color: @default-font-color;
                @media screen and (max-width: 1125px) {
                    font-size: 26px;
                }
            }
            .en {
                color: #e0e0e0;
                position: relative;
                margin-top: 5px;
                @media screen and (max-width: 1220px) {
                    font-size: 26px;
                }
                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -10px;
                    width: 94px;
                    height: 6px;
                    border-radius: 2px;
                    background-image: linear-gradient(
                        2deg,
                        rgb(6, 73, 182) 0%,
                        rgb(45, 122, 238) 100%
                    );
                }
            }
        }
    }
    ul {
        padding: 0;
        margin: 0;
        display: flex;
        gap: 10px;
        flex: 1;
        justify-content: space-between;
        max-width: 900px;
        width: 100%;
        align-self: stretch;
        @media screen and (max-width: 1125px) {
            max-width: unset;
        }
        @media screen and (max-width: @viewport-md) {
            flex-direction: column;
            gap: 20px;
        }
        li {
            position: relative;
            display: flex;
            flex-direction: column;
            border-radius: 11px;
            background-color: rgb(255, 255, 255);
            box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.05);
            width: 280px;
            overflow: hidden;
            @media screen and (max-width: @viewport-md) {
                width: 100%;
                flex-direction: row;
            }
            > img {
                width: 100%;
                height: 292px;
                object-fit: cover;
                @media screen and (max-width: @viewport-md) {
                    width: 200px;
                    height: 130px;
                }
                @media screen and (max-width: @viewport-sm) {
                    width: 150px;
                    height: 110px;
                }
            }
            .content {
                padding: 20px 25px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                @media screen and (max-width: @viewport-md) {
                    flex: 1;
                }
                @media screen and (max-width: @viewport-sm) {
                    padding: 10px 15px;
                }
                .time {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    .date {
                        font-size: 24px;
                        @media screen and (max-width: @viewport-sm) {
                            font-size: 20px;
                        }
                    }
                    .time-bucket {
                        font-size: 14px;
                        color: #cfcfcf;
                    }
                }
                .title {
                    font-size: 18px;
                    color: #5e5e5e;
                    line-height: 28px;
                    @media screen and (max-width: @viewport-sm) {
                        line-height: 22px;
                        font-size: 16px;
                    }
                }
                a {
                    position: absolute;
                    right: 24px;
                    bottom: 27px;
                    color: #82b6fc;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    @media screen and (max-width: @viewport-sm) {
                        position: static;
                        margin-top: 5px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
