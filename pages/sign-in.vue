<template>
    <div class="container">
        <picture>
            <source media="(min-width: 769px)" :srcset="pcBackground" />
            <source media="(max-width: 768px)" :srcset="mobileBackground" />
            <img :src="pcBackground" alt="2023世界储能大会banner图片" />
        </picture>
        <div class="box">
            <el-tabs v-model="signType">
                <el-tab-pane
                    :label="`${$t('audience')}${$t('signIn')}`"
                    :name="SignType.AUDIENCE"
                />
                <el-tab-pane :label="`${$t('media')}${$t('signIn')}`" :name="SignType.MEDIA" />
            </el-tabs>
            <Form ref="formRef" @submit="handleFormSubmit" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ElMessage } from 'element-plus'

    import Form from '~/components/SignIn/Form.vue'

    import useI18n from '~/hooks/useI18n'

    import pcBackground from '~/assets/images/sign-in-background-pc.webp?url'
    import mobileBackground from '~/assets/images/sign-in-background-mobile.webp?url'

    definePageMeta({
        layout: 'empty'
    })

    const { $t } = useI18n()

    const route = useRoute()
    const router = useRouter()
    const localePath = useLocalePath()

    enum SignType {
        AUDIENCE = 0,
        MEDIA = 1
    }
    const signType = ref<SignType>(Number(route.query.type) || SignType.AUDIENCE)
    const formRef = ref<InstanceType<typeof Form>>()

    const handleFormSubmit: InstanceType<typeof Form>['onSubmit'] = () => {
        ElMessage.info($t('signIn.form.registration.closed'))
    }

    onMounted(() => {
        ElMessage.info($t('signIn.form.registration.closed'))
        setTimeout(() => {
            router.push(localePath('/'))
        }, 3000)
    })
</script>

<style scoped lang="less">
    .container {
        background-color: #1958b4;
        height: 100vh;
        position: relative;
        img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .box {
        background-color: #fff;
        padding: 20px 30px;
        width: 100%;
        max-width: 500px;
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 60%;
        transform: translate(-50%, -50%);
        border-radius: 20px;
    }

    @media screen and (max-width: @viewport-md) {
        .container {
            display: flex;
            flex-direction: column;
            img {
                height: auto;
                overflow: hidden;
                position: static;
            }
        }
        .box {
            flex: 1;
            max-width: unset;
            position: static;
            transform: translate(0, 0);
            border-radius: 0;
        }
    }
</style>
