<template>
    <el-form ref="formRef" :model="formDataModel" size="large">
        <el-form-item prop="name" :rules="rules.name">
            <el-input
                v-model="formDataModel.name"
                :placeholder="(rules.name[0].message as string)"
            />
        </el-form-item>
        <el-form-item prop="organization" :rules="rules.organization">
            <el-input
                v-model="formDataModel.organization"
                :placeholder="(rules.organization[0].message as string)"
            />
        </el-form-item>
        <el-form-item prop="post" :rules="rules.post">
            <el-input
                v-model="formDataModel.post"
                :placeholder="(rules.post[0].message as string)"
            />
        </el-form-item>
        <el-form-item prop="phone" :rules="rules.phone">
            <el-input
                v-model="formDataModel.phone"
                :placeholder="(rules.phone[0].message as string)"
            />
        </el-form-item>
        <el-form-item prop="code" :rules="rules.code">
            <div style="display: flex; width: 100%">
                <el-input
                    v-model="formDataModel.code"
                    :placeholder="(rules.code[0].message as string)"
                    style="flex: 1"
                >
                    <template #append>
                        <div v-if="error">{{ $t('http.error') }}</div>
                        <template v-else>
                            <img
                                :src="`data:image/png;base64,${captchaImageData.captchaImage}`"
                                alt="code"
                                class="captchaImage"
                                @click="() => refreshCaptchaImage()"
                            />
                        </template>
                    </template>
                </el-input>
            </div>
        </el-form-item>
        <el-form-item prop="phoneCode" :rules="rules.phoneCode">
            <div style="display: flex; width: 100%">
                <el-input
                    v-model="formDataModel.phoneCode"
                    :placeholder="(rules.phoneCode[0].message as string)"
                    style="flex: 1"
                />
                <el-button
                    type="primary"
                    class="get-code-button"
                    style="width: 100px"
                    :disabled="waitingTime !== 0"
                    @click="handlePhoneCodeButtonClick"
                >
                    {{ waitingTime !== 0 ? waitingTime + 's' : $t('signIn.form.get.code') }}
                </el-button>
            </div>
        </el-form-item>
        <el-form-item prop="email" :rules="rules.email">
            <el-input
                v-model="formDataModel.email"
                :placeholder="createFormItemRequiredTip('email')"
            />
        </el-form-item>
        <el-form-item class="submit-button" style="margin-top: 20px">
            <el-button type="primary" :loading="submitButtonLoading" @click="handleSubmit">
                {{ $t('signIn.form.submit') }}
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'
    import type { FormItemRule, ElForm } from 'element-plus'
    import { ElMessage } from 'element-plus'

    import getPhoneCode from '~/http/apis/getPhoneCode'
    import getCaptchaImage from '~/http/apis/getCaptchaImage'

    const {
        data: captchaImageData,
        refresh: refreshCaptchaImage,
        error
    } = useAsyncData(() => getCaptchaImage(), {
        transform: data => ({
            captchaImage: data.img,
            uuid: data.uuid
        }),
        default: () => ({
            captchaImage: '',
            uuid: ''
        })
    })

    const formDataModel = reactive({
        name: '',
        organization: '',
        post: '',
        phone: '',
        phoneCode: '',
        // 图形验证码
        code: '',
        email: ''
    })

    const emits = defineEmits<{
        (event: 'submit', formData: typeof formDataModel): void
    }>()

    defineProps<{
        submitButtonLoading?: boolean
    }>()

    const { t: $t } = useI18n()

    const formRef = ref<InstanceType<typeof ElForm>>()

    const createFormItemRequiredTip = (propName: string) => {
        return $t('signIn.form.please.enter') + $t('signIn.form.' + propName)
    }

    const rules: Record<string, FormItemRule[]> = {
        name: [],
        organization: [],
        post: [],
        phone: [
            {
                validator: (_, value, callback) => {
                    if (value.length !== 11 || isNaN(Number(value))) {
                        callback($t('signIn.form.enter.correct.phone'))
                    }
                    callback()
                },
                trigger: 'blur'
            }
        ],
        phoneCode: [],
        code: [],
        email: [
            {
                type: 'email',
                message: $t('signIn.form.enter.correct.email'),
                trigger: ['blur', 'change']
            }
        ]
    }
    Object.keys(rules).forEach(key => {
        rules[key].unshift({
            required: true,
            message: createFormItemRequiredTip(key)
        })
    })

    const waitingTime = ref(0)
    let interval: NodeJS.Timeout
    const handlePhoneCodeButtonClick = async () => {
        const validateResult = await formRef.value?.validateField(['phone', 'code'])

        if (validateResult) {
            try {
                await getPhoneCode(
                    formDataModel.phone,
                    captchaImageData.value.uuid,
                    formDataModel.code
                )

                ElMessage.success($t('signIn.form.code.sent'))
                waitingTime.value = 60
                interval = setInterval(() => {
                    if (waitingTime.value === 0) {
                        clearInterval(interval)
                        return
                    }
                    waitingTime.value--
                }, 1000)
            } catch (_) {
                refreshCaptchaImage()
            }
        }
    }

    const handleSubmit = async () => {
        const validateResult = await formRef.value?.validateField(
            Object.keys(rules).filter(item => item !== 'code')
        )

        if (validateResult) {
            emits('submit', formDataModel)
        }
    }

    const resetForm = () => {
        Object.assign(formDataModel, {
            name: '',
            organization: '',
            post: '',
            phone: '',
            code: '',
            email: ''
        })
        nextTick(formRef.value?.resetFields)
    }

    defineExpose({
        resetForm
    })
</script>

<style scoped lang="less">
    .submit-button {
        :deep(.el-form-item__content) {
            @media screen and (max-width: @viewport-md) {
                justify-content: center;
            }
        }
    }
    .captchaImage {
        width: 100px;
        height: 100%;
        cursor: pointer;
    }
    :deep(.el-input-group__append) {
        padding: 0;
    }
</style>
