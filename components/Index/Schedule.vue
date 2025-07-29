<template>
    <div class="container">
        <a id="schedule" style="position: relative; display: block; top: -30px"></a>
        <div class="title">{{ $t('agenda') }}</div>
        <div class="schedule">
            <div class="calendar">
                <span :class="activeDate === 8 ? 'active' : ''" @click="activeDate = 8"> 8 </span>
                <span :class="activeDate === 9 ? 'active' : ''" @click="activeDate = 9"> 9 </span>
                <span :class="activeDate === 10 ? 'active' : ''" @click="activeDate = 10">
                    10
                </span>
            </div>
            <ul>
                <li v-for="(schedule, index) in scheduleList[activeDate]" :key="index">
                    <div class="time">
                        <div class="time-bucket">{{ schedule.timeBucket }}</div>
                        <div class="date">{{ schedule.date }}</div>
                    </div>
                    <div class="content">
                        <div class="title">{{ schedule.title }}</div>
                        <div class="address">{{ $t('address') }}: {{ schedule.address }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    const scheduleList = {
        8: [
            {
                date: '08',
                timeBucket: '14:00-20:00',
                title: '嘉宾报道',
                address: '佰翔三都澳国际会议中心'
            },
            {
                date: '08',
                timeBucket: '18:00-20:00',
                title: '欢迎晚宴',
                address: '宁德富力万达嘉华酒店三楼宴会厅'
            }
        ],
        9: [
            {
                date: '09',
                timeBucket: '09:00-12:00',
                title: '开幕大会暨主论坛',
                address: '佰翔三都澳国际会议中心'
            },
            {
                date: '09',
                timeBucket: '14:00-17:10',
                title: '主题论坛1：全球视野下的储能市场、政策与环境',
                address: '佰翔三都澳国际会议中心'
            }
        ],
        10: [
            {
                date: '10',
                timeBucket: '09:00-10:45',
                title: '主题论坛2：技术驱动，创新储能',
                address: '佰翔三都澳国际会议中心'
            },
            {
                date: '10',
                timeBucket: '10:45-12:10',
                title: '主题论坛3：储能的全新场景和应用',
                address: '佰翔三都澳国际会议中心'
            }
            // {
            //     date: '10',
            //     timeBucket: '14:00-17:00',
            //     title: '特色活动——标杆企业/应用场景实地调研',
            //     address: '佰翔三都澳国际会议中心'
            // }
        ]
    }

    const activeDate = ref<8 | 9 | 10>(8)
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
            @media screen and (max-width: @viewport-md) {
                font-size: 18px;
            }
        }
    }
    .schedule {
        display: flex;
        padding: 15px 0;
        gap: 30px;
        @media screen and (max-width: @viewport-lg) {
            gap: 10px;
        }
        @media screen and (max-width: @viewport-md) {
            flex-direction: column;
            align-items: center;
            gap: 30px;
        }
        .calendar {
            width: 415px;
            height: 354px;
            background-image: url('~/assets/images/calendar.png');
            background-position: center;
            background-size: 100%;
            position: relative;
            @media screen and (max-width: @viewport-lg) {
                transform: scale(0.8);
                margin: -35px -40px;
            }
            > span {
                height: 44px;
                width: 44px;
                border-radius: 50%;
                font-size: 20px;
                position: absolute;
                line-height: 44px;
                text-align: center;
                color: transparent;
                background-color: transparent;
                cursor: pointer;
                &.active {
                    background-color: #fca325;
                    color: #ffffff;
                    display: block;
                }
                &:nth-child(1) {
                    left: 186px;
                    top: 121px;
                }
                &:nth-child(2) {
                    left: 244px;
                    top: 121px;
                }
                &:nth-child(3) {
                    left: 301px;
                    top: 121px;
                }
            }
        }
        ul {
            display: inline-block;
            margin: 0;
            padding: 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
            overflow: hidden;
            width: 100%;
            @media screen and (max-width: @viewport-lg) {
                gap: 10px;
            }
        }
        li {
            display: flex;
            box-shadow: 0 0 12px -2px rgba(0, 0, 0, 0.04);
            padding: 20px 0;
            width: 100%;
            @media screen and (max-width: @viewport-lg) {
                padding: 16px 0;
            }
            .time {
                padding: 0 20px;
                border-right: 1px solid #dddddd;
                text-align: center;
                width: 100px;
                box-sizing: content-box;
                width: 104px;
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                @media screen and (max-width: @viewport-lg) {
                    padding: 0 15px;
                }
                @media screen and (max-width: @viewport-sm) {
                    padding: 0 10px 0 0;
                    width: auto;
                }
                .time-bucket {
                    font-size: 18px;
                    color: #888888;
                    @media screen and (max-width: @viewport-lg) {
                        font-size: 16px;
                    }
                    @media screen and (max-width: @viewport-sm) {
                        font-size: 14px;
                    }
                }
                .date {
                    font-size: 30px;
                    margin-top: 8px;
                    color: @default-font-color;
                    @media screen and (max-width: @viewport-lg) {
                        font-size: 26px;
                    }
                    @media screen and (max-width: @viewport-sm) {
                        font-size: 20px;
                    }
                }
            }
            .content {
                flex: 1;
                padding: 0 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                overflow: hidden;
                @media screen and (max-width: @viewport-lg) {
                    padding: 0 15px;
                }
                .title {
                    font-size: 24px;
                    font-weight: bold;
                    color: @default-font-color;
                    @media screen and (max-width: @viewport-lg) {
                        font-size: 20px;
                    }
                    @media screen and (max-width: @viewport-sm) {
                        font-size: 16px;
                        line-height: 20px;
                    }
                }
                .address {
                    margin-top: 10px;
                    color: #666666;
                    font-size: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    @media screen and (max-width: @viewport-lg) {
                        font-size: 16px;
                    }
                    @media screen and (max-width: @viewport-sm) {
                        margin-top: 6px;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>
