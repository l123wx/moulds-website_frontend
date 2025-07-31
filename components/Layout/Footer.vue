<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-left">
                <h3 class="subscribe-title">邮件订阅</h3>
                <div class="subscribe-form">
                    <input type="text" class="email-input" placeholder="您的邮箱" />
                    <button class="submit-btn">
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                            <path d="M885.113 489.373L628.338 232.599c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255l203.3 203.3H158.025c-17.036 0-30.846 13.811-30.846 30.846 0 17.036 13.811 30.846 30.846 30.846h628.36L583.084 746.147c-12.497 12.496-12.497 32.758 0 45.255 6.248 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372l256.775-256.775a31.999 31.999 0 0 0 0-45.254z"></path>
                        </svg>
                    </button>
                </div>
                <div class="copyright">
                    <p>版权所有 © {{ new Date().getFullYear() }} 东莞市德荣模塑科技有限公司</p>
                </div>
            </div>
            <div class="footer-right">
                <div class="social-links">
                    <template v-for="item in socialLinkList" :key="item.id">
                        <a :href="item.url" class="social-link" :title="item.name" target="_blank">
                            <img :src="item.icon" :alt="item.name" />
                        </a>
                    </template>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
    import getAllSocialLink from '~/http/apis/getAllSocialLink'

    import useI18n from '~/hooks/useI18n'

    const { $tt } = useI18n()

    const { data: socialLinkList, error } = useAsyncData(() => getAllSocialLink(), {
        server: false,
        transform: data => data.data,
        default: () => []
    })
</script>

<style scoped lang="less">
    @import '~/assets/styles/var.less';

    .footer {
        position: relative;
        width: 100%;
        background-color: rgba(246,246,246,1);
        padding: 40px 20px;
        overflow: hidden;
        box-sizing: border-box;
    }

    .footer-content {
        max-width: @page-content-max-width;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        @media (max-width: @viewport-md) {
            flex-direction: column;
            gap: 40px;
        }
    }

    .footer-left {
        max-width: 400px;
    }

    .subscribe-title {
        font-size: 20px;
        margin: 0 0 20px 0;
        font-weight: 500;
    }

    .subscribe-form {
        display: flex;
        margin-bottom: 30px;

        .email-input {
            flex: 1;
            height: 40px;
            padding: 0 15px;
            border: none;
            outline: none;
            background-color: #fff;
        }

        .submit-btn {
            width: 40px;
            height: 40px;
            background-color: @main-color;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            svg {
                fill: #fff;
            }

            &:hover {
                background-color: darken(@main-color, 10%);
            }
        }
    }

    .copyright {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);

        p {
            margin: 8px 0;
        }
    }

    .footer-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .social-links {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;

        .social-link {
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            &:hover {
                background: rgba(255, 255, 255, 0.4);
                transform: translateY(-2px);
            }
        }
    }

    .contact-buttons {
        position: fixed;
        right: 20px;
        bottom: 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        z-index: 100;
    }
</style>
