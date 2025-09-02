<template>
    <div>
        <div style="padding-top: 5px;">
            <Breadcrumb :breadcrumb-list="breadcrumbList" :breadcrumb-pending="false" />
        </div>
        <div class="contact-section">
            <h1 class="section-title">{{ $t('Contact Us') }}</h1>
            <div class="contact-cards">
                <div
                    v-for="(contact, index) in contactInfoList"
                    :key="index"
                    class="contact-card"
                >
                    <div class="card-header">
                        <img v-if="contact.imagePath" :src="contact.imagePath" alt="公司标志" class="company-logo">
                        <h2 class="company-title">{{ contact.name }}</h2>
                    </div>
                    <div class="card-content">
                        <div
                            v-if="contact.address"
                            class="contact-item"
                        >
                            <span class="label">
                                {{ $t('Address') }}:
                            </span>
                            <span>{{ contact.address }}</span>
                        </div>
                        <div
                            v-if="contact.phone"
                            class="contact-item"
                        >
                            <span class="label">
                                {{ $t('Phone') }}:
                            </span>
                            <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
                        </div>
                        <div
                            v-if="contact.email"
                            class="contact-item"
                        >
                            <span class="label">
                                {{ $t('Email') }}:
                            </span>
                            <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
                        </div>
                        <div
                            v-if="contact.website"
                            class="contact-item"
                        >
                            <span class="label">
                                {{ $t('Website') }}:
                            </span>
                            <a :href="contact.website" target="_blank" rel="noopener noreferrer">{{ contact.website }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="message-section">
            <h1 class="section-title">{{ $t('Contact Us') }}</h1>
            <p class="message-tips">{{ $t('Contact Us Tips') }}</p>
            <el-form ref="formRef" :model="formData" :rules="formRules">
                <div class="form-row">
                    <el-form-item prop="name" class="form-item">
                        <el-input v-model="formData.name" style="height: 50px;" :placeholder="$t('Name')" />
                    </el-form-item>
                    <el-form-item prop="company" class="form-item">
                        <el-input v-model="formData.company" style="height: 50px;" :placeholder="$t('Company')" :maxlength="100" />
                    </el-form-item>
                </div>
                <div class="form-row">
                    <el-form-item prop="email" class="form-item">
                        <el-input v-model="formData.email" style="height: 50px;" :placeholder="$t('Email')" />
                    </el-form-item>
                    <el-form-item prop="phone" class="form-item">
                        <el-input v-model="formData.phone" style="height: 50px;" :placeholder="$t('Phone')" />
                    </el-form-item>
                </div>
                <el-form-item prop="message">
                    <el-input
                        v-model="formData.message"
                        type="textarea"
                        :rows="5"
                        resize="none"
                        :placeholder="$t('Content')"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button style="height: 50px" type="primary" :loading="isSubmitting" @click="submitForm">{{ $t('Submit') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import type { FormItemRule } from 'element-plus'
    import Breadcrumb from '~/components/Layout/Breadcrumb.vue'
    import getAllContactInfo from '~/http/apis/getAllContactInfo'
    import userConsult from '~/http/apis/userConsult'
    import { useLoading } from '~/hooks/useLoading'
    import useRoutePath from '~/hooks/useRoutePath'

    definePageMeta({
        layout: 'about-us'
    })

    const { t, locale } = useI18n()
    const { informationSubmittedSuccessPath } = useRoutePath()
    const localePath = useLocalePath()
    const router = useRouter()

    const breadcrumbList = ref([
        {
            label: t('About Us')
        },
        {
            label: t('Contact Us')
        }
    ])

    const { data: contactInfoList } = useAsyncData(
        'getAllContactInfo',
        () => getAllContactInfo(locale.value),
        {
            transform: data => data.data
        }
    )

    // 表单数据
    const formRef = ref()
    const formData = ref({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
    })

    // 表单验证规则
    const formRules = {
        email: [
            { required: true, message: t('Please input {name}', { name: t('Email') }), trigger: 'blur' } as FormItemRule,
            { type: 'email' as const, message: t('Please input valid Email'), trigger: 'blur' } as FormItemRule
        ],
        phone: [
            { required: true, message: t('Please input {name}', { name: t('Phone') }), trigger: 'blur' } as FormItemRule
        ],
        message: [
            { required: true, message: t('Please input {name}', { name: t('Content') }), trigger: 'blur' } as FormItemRule
        ]
    }

    // 提交表单
    const [isSubmitting, runSubmit] = useLoading()
    const submitForm = async () => {
        if (!formRef.value) {
            return
        }

        try {
            await formRef.value.validate()
            await runSubmit(userConsult(
                {
                    name: formData.value.name,
                    company: formData.value.company,
                    email: formData.value.email,
                    phone: formData.value.phone
                },
                formData.value.message
            ))

            router.push(localePath(informationSubmittedSuccessPath))
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
        }
    }
</script>

<style scoped lang="less">
.section-title {
    font-size: 32px;
    font-weight: bold;
    margin: 35px 0;
}

.contact-section {
    margin-bottom: 60px;
}

.contact-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    padding-bottom: 15px;

    @media screen and (max-width: @viewport-md) {
        grid-template-columns: 1fr;
    }
}

.contact-card {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 50px;
}

.card-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    gap: 12px;
}

.company-logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

.company-title {
    font-size: 20px;
    font-weight: bold;
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.contact-item {
    font-size: 14px;
    .label {
        margin-right: 4px;
    }
}

.message-tips {
    margin-bottom: 30px;
    font-size: 16px;
}

.form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    @media screen and (max-width: @viewport-sm) {
        grid-template-columns: 1fr;
        gap: 0;
    }
}

:deep(.el-form-item__label) {
    font-weight: 500;
}

:deep(.el-button--primary) {
    min-width: 120px;
}
</style>
