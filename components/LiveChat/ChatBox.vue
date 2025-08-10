<template>
    <div class="chat" :class="{ open: isOpen }">
        <div class="form-container" :class="{ open: formModalOpen }">
            <div class="form-modal">
                <button
                    type="button" aria-label="Close modal" class="close-modal-button"
                    @click="handleModalCloseClick">
                    <ArrowDown />
                </button>
                <div class="always-online">
                    <div style="display: flex; flex-direction: column; row-gap: 20px;">
                        <div class="form-tips">
                            <span>
                                We’re currently unavailable. We’ll get back to you when one of
                                our operators is able to respond. Please provide your email address so we can get in
                                touch with you.
                            </span>
                        </div>
                        <el-form
                            ref="modalFormRef"
                            :model="{
                                ...formData,
                                email
                            }"
                        >
                            <el-form-item
                                prop="email" :rules="[
                                    { required: true, message: 'Please input email' },
                                    { type: 'email', message: 'Please input correct email', trigger: 'blur' }
                                ]">
                                <el-input v-model="email" placeholder="Enter your email..." />
                            </el-form-item>
                            <el-form-item prop="message" :rules="[{ required: true, message: 'Please input message' }]">
                                <el-input
                                    v-model="formData.message" resize="none" type="textarea" :rows="4"
                                    placeholder="Enter your message..." />
                            </el-form-item>
                            <el-button class="form-submit-button" :loading="isSubmitting" @click="handleFormSubmit">Send</el-button>
                        </el-form>
                    </div>
                </div>
                <div class="form-success-result" :class="{ show: formSuccessResultShow }">
                    <CircleCheck />
                    <div class="text"><span>Thank you, your ticket is submitted!</span></div>
                </div>
            </div>
        </div>

        <div role="presentation" class="chat-container" style="opacity: 1; position: relative;">
            <div class="chat-header">
                <div class="chat-header-title">
                    <div class="chat-header-title-text"><span>LD Consultation</span></div>
                    <div class="chat-header-close">
                        <button
                            class="close-chat-button" type="button" aria-label="Minimize"
                            @click="emit('update:isOpen', false)">
                            <Close />
                        </button>
                    </div>
                </div>
            </div>
            <div id="conversation-group" ref="messageContainerRef" role="log">
                <div id="messages" aria-live="polite" aria-atomic="false">
                    <transition-group name="message">
                        <div v-for="(message, index) in chatMessages" :key="index" class="message message-operator  ">
                            <span class="message-content">
                                {{ message }}
                            </span>
                        </div>
                    </transition-group>
                </div>
            </div>
            <div class="input-group">
                <div class="footer-input-wrapper">
                    <div class="footer-input-wrapper-content">
                        <textarea
                            id="new-message-textarea" ref="textareaRef" v-model="formData.message" rows="1"
                            placeholder="Enter your message..." aria-label="New message"
                            :style="textareaCalcStyle"></textarea>
                        <button
                            id="send-button" type="button" class="chat-message-submit-btn"
                            @click="handleChatSubmit">
                            <svg
                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="directional-icon">
                                <path
                                    d="M5.78393 10.7733L3.47785 6.16113C2.36853 3.9425 1.81387 2.83318 2.32353 2.32353C2.83318 1.81387 3.9425 2.36853 6.16113 3.47785L19.5769 10.1857C21.138 10.9663 21.9185 11.3566 21.9185 11.9746C21.9185 12.5926 21.138 12.9829 19.5769 13.7634L6.16113 20.4713C3.9425 21.5806 2.83318 22.1353 2.32353 21.6256C1.81387 21.116 2.36853 20.0067 3.47785 17.788L5.78522 13.1733H12.6367C13.2995 13.1733 13.8367 12.636 13.8367 11.9733C13.8367 11.3105 13.2995 10.7733 12.6367 10.7733H5.78393Z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Close, ArrowDown, CircleCheck } from '@element-plus/icons-vue'
    import { calcTextareaHeight } from 'element-plus/es/components/input/src/utils'
    import { useStorage } from '@vueuse/core'
    import userConsult from '~/http/apis/userConsult'
    import { useLoading } from '~/hooks/useLoading'
    import useBodyScroll from '~/hooks/useBodyScroll'

    const LOCAL_STORAGE_EMAIL_KEY = 'live-chat-email'

    const props = defineProps<{
        isOpen: boolean
    }>()

    const emit = defineEmits(['update:isOpen'])

    const email = useStorage(LOCAL_STORAGE_EMAIL_KEY, '')
    const [isSubmitting, runSubmit] = useLoading()
    const { lock, unlock } = useBodyScroll()

    const formModalOpen = ref(false)
    const formSuccessResultShow = ref(false)
    const isChatInitialized = ref(false)

    const modalFormRef = ref()
    const formData = ref({
        message: ''
    })

    const welcomeMessage = 'Hey Sir, Thanks for reaching out! We’re on it and will get back to you soon (usually within 24 hours).Quick question—to save us both time:Need faster help? Ping us directly:\n[Phone]：+0086 0769 82930142\n[Email] ：info@ldplastic-solution.com'
    const thankYouMessage = 'Thank you, your ticket was submitted and you\'ll get a reply via email.'
    const messageContainerRef = ref()
    const chatMessages = ref<string[]>([])
    const addMessage = (msg: string) => {
        chatMessages.value.push(msg)
        nextTick(() => {
            messageContainerRef.value.scrollTo({
                top: messageContainerRef.value.scrollHeight,
                behavior: 'smooth'
            })
        })
    }

    const textareaCalcStyle = ref({})
    const textareaRef = ref<HTMLTextAreaElement>()
    const resizeTextarea = () => {
        const minRows = 1
        const maxRows = 4

        const textareaStyle2 = calcTextareaHeight(textareaRef.value!, minRows, maxRows)
        textareaCalcStyle.value = {
            overflowY: 'hidden',
            ...textareaStyle2
        }
        nextTick(() => {
            textareaCalcStyle.value = textareaStyle2
        })
    }

    onMounted(() => {
        watch(() => formData.value.message, () => {
            resizeTextarea()
        })

        watch(() => props.isOpen, () => {
            if (props.isOpen) {
                lock()
            } else {
                unlock()
            }

            if (props.isOpen && !isChatInitialized.value) {
                setTimeout(() => {
                    addMessage(welcomeMessage)
                    isChatInitialized.value = true
                }, 1000)
            }
        }, { immediate: true })
    })

    const handleChatSubmit = () => {
        formModalOpen.value = true
    }

    const handleFormSubmit = async () => {
        await modalFormRef.value.validate()
        await runSubmit(userConsult({ email: email.value }, formData.value.message))
        formSuccessResultShow.value = true
        setTimeout(() => {
            addMessage(thankYouMessage)
            formData.value.message = ''
        }, 500)
    }

    const handleModalCloseClick = () => {
        formModalOpen.value = false
        formSuccessResultShow.value = false
    }
</script>

<style scoped lang="less">
button {
    // reset
    background: none;
    border: 0px;
    color: inherit;
    font-style: inherit;
    font-variant: inherit;
    font-weight: inherit;
    font-stretch: inherit;
    font-size: inherit;
    font-family: inherit;
    font-optical-sizing: inherit;
    font-size-adjust: inherit;
    font-kerning: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    line-height: normal;
    overflow: visible;
    padding: 0px;
    user-select: none;
    outline: none;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.chat {
    background: rgb(255, 255, 255);
    interpolate-size: allow-keywords;
    transition: bottom 200ms ease-in-out, opacity 200ms ease-in-out;

    max-height: calc(100% - 47px);
    display: flex;
    flex-direction: column;

    width: 372px;
    height: 700px;
    position: absolute;
    bottom: -100%;
    right: 24px;
    opacity: 0;
    border-radius: var(--radius-surface, 16px);
    pointer-events: auto;
    box-shadow: rgba(0, 18, 46, 0.16) 0px 8px 18px 0px;
    overflow: hidden;
    z-index: 2000;
    left: auto;

    &.open {
        bottom: 24px;
        opacity: 1;
    }

    @media screen and (max-width: @viewport-sm) {
        width: 100vw;
        right: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        &.open {
            bottom: 0px;
        }
    }

    --custom-background: linear-gradient(135deg, #2a27da 0%, #00ccff 100%);
    --custom-text-color: #fff;
    --custom-action-color: #0566ff;
    --custom-action-color-contrast: #fff;
    --custom-action-color-hover: color-mix(in srgb, var(--custom-action-color) 12%, transparent);
    --chat-padding: 24px;
    --label-shadow: 0 2px 20px 0 rgba(0, 18, 46, 0.18);
    --fly-shadow: 0 8px 26px 0 rgba(0, 18, 46, 0.16);
}

.form-container {
    position: absolute;
    inset: 0px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms ease-in-out;

    &.open {
        opacity: 1;
        pointer-events: auto;

        .form-modal {
            transform: translateY(-100%);
        }
    }
}

.form-modal {
    position: absolute;
    top: 100%;
    left: 8px;
    right: 8px;
    box-sizing: border-box;
    width: calc(100% - 16px);
    max-height: calc(100% - 8px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 55px 20px 32px;
    background: rgb(255, 255, 255);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    transition: transform 200ms ease-in-out;

    transform: translateY(0);

    .pre-chat,
    .always-online {
        max-width: 100%;
        width: 100%;
    }
}

.close-modal-button {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    &:hover::before {
        transform: scale(1);
    }

    &::before {
        content: "";
        position: absolute;
        background: rgba(8, 15, 26, 0.16);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        z-index: -1;
        transition: 0.16s ease-in-out;
        transform: scale(0);
        top: calc(50% - 20px);
        left: calc(50% - 20px);
    }

    svg {
        fill: rgb(109, 126, 158);
        width: 20px;
        height: 20px;
    }
}

.form-tips {
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    color: rgb(0, 18, 46);
}

.form-submit-button {
    flex-shrink: 0;
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 6px;
    background: var(--custom-action-color);
    color: var(--custom-action-color-contrast);
    position: relative;
    transition: background 0.3s ease-in-out;

    &:hover {
        background: #295ce3;
    }
}

.form-success-result {
    position: absolute;
    inset: 0px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    align-items: center;
    justify-content: center;
    background: rgb(255, 255, 255);
    padding: 32px 20px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;

    opacity: 0;
    transform: scale(0.7);
    transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
    pointer-events: none;

    &.show {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
    }

    svg {
        position: unset;
        width: 48px;
        height: 48px;
        color: rgb(52, 184, 87);
    }

    .text {
        font-size: 20px;
        font-weight: 600;
        color: rgb(0, 18, 46);
        text-align: center;
    }
}

.chat-container {
    min-height: 0px;
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    inset: 0px;
}

.chat-header {
    padding: 14px var(--chat-padding) 10px;
    background: var(--custom-background);
    color: var(--custom-text-color);
    position: relative;
    z-index: 4;
    flex: 0 0 auto;

    .chat-header-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: -4px;

        .chat-header-title-text {
            flex-grow: 1;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            align-items: center;
        }

        .chat-header-close {
            height: 40px;
            margin-inline: auto -12px;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;

            .close-chat-button.close-chat-button {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--custom-text-color);
                position: relative;
                outline: none;

                &:hover::before {
                    transform: scale(1);
                }

                &::before {
                    content: "";
                    position: absolute;
                    background: rgba(8, 15, 26, 0.16);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    z-index: -1;
                    transition: 0.16s ease-in-out;
                    transform: scale(0);
                    top: calc(50% - 20px);
                    left: calc(50% - 20px);
                }

                svg {
                    width: 24px;
                    height: 24px;
                    fill: currentcolor;
                    transition: 0.16s ease-in-out;
                }

                span {
                    background: rgb(255, 255, 255);
                    padding: 6px 8px;
                    border-radius: 4px;
                    box-shadow: rgba(0, 27, 71, 0.24) 0px 8px 20px 0px;
                    font-size: 13px;
                    position: absolute;
                    opacity: 0;
                    pointer-events: none;
                    white-space: nowrap;
                    transition: 0.16s ease-in-out;
                    z-index: 1;
                    top: 50%;
                    color: rgb(6, 19, 43);
                    margin-inline-end: 10px;
                    inset-inline-end: 100%;
                    transform: translate(5px, -50%);
                }
            }
        }
    }
}

#conversation-group {
    overflow: hidden auto;
    background: rgb(255, 255, 255);
    transition: 0.3s;
    min-height: 160px;
    height: 487px;
    padding-inline: var(--chat-padding, 24px);
    flex: 1 1 auto;
}

#messages {
    position: relative;
    margin-top: 10px;
    width: 100%;
    padding-bottom: 24px;
    float: left;

    .message-operator {
        color: rgb(6, 19, 43);
        background: var(--operator-message, #f0f2f7);
        float: left;
    }

    .message {
        padding-block: var(--message-padding-block, 10px);
        padding-inline: var(--message-padding-inline, 16px);
        border-radius: var(--radius-component, 20px);
        margin: 2px 0px;
        font-size: var(--message-font-size, 15px);
        line-height: var(--message-line-height, 20px);
        overflow-wrap: break-word;
        display: inline-block;
        max-width: 85%;
        clear: both;
        position: relative;
        transition: margin 0.28s ease-in-out;

        span.message-content {
            white-space: pre-line;
        }
    }

    .message-enter-active,
    .message-leave-active {
        transition: all 0.5s ease;
    }
    .message-enter-from,
    .message-leave-to {
        opacity: 0;
        transform: translateX(-30px);
    }
}

.input-group {
    padding-inline: var(--chat-padding, 24px);
    padding-bottom: 16px;
    position: relative;
    background: rgb(255, 255, 255);
    z-index: 3;
    flex: 0 0 auto;

    .footer-input-wrapper {
        transition: 0.5s ease-in-out;
        opacity: 1;
        transform: translateY(0px);
        border-top: 1px solid #dbdfe6;

        .footer-input-wrapper-content {
            display: flex;
            align-items: center;
            gap: 12px;

            textarea {
                border: 0px;
                width: 100%;
                font-size: 16px;
                resize: none;
                line-height: 20px;
                overflow-x: hidden;
                padding: 16px 0px;
            }

            .chat-message-submit-btn {
                width: 38px;
                height: 38px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                outline: none;
                flex: 0 0 38px;
                color: var(--custom-action-color);
                transform: translateX(8px);

                &::before {
                    content: "";
                    position: absolute;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    z-index: -1;
                    transition: 0.16s ease-in-out;
                    transform: scale(0);
                    top: calc(50% - 19px);
                    left: calc(50% - 19px);
                }

                &:hover::before {
                    transform: scale(1);
                    background-color: var(--custom-action-color-hover, rgba(0, 125, 252, 0.12));
                }

                svg {
                    width: 22px;
                    height: 22px;
                    fill: currentcolor;
                    transition: 0.16s ease-in-out;
                }
            }
        }
    }
}
</style>
