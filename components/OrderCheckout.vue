<script setup lang="ts">
    import type { FormInstance, FormRules } from 'element-plus'
    import { useStorage } from '@vueuse/core'
    import useScreenMediaQuery from '~/hooks/useScreenMediaQuery'
    import useBodyScroll from '~/hooks/useBodyScroll'
    import checkoutOrder from '~/http/apis/checkoutOrder'
    import useCart from '~/hooks/useCart'
    import { useLoading } from '~/hooks/useLoading'
    import useRoutePath from '~/hooks/useRoutePath'

    const { isMobile } = useScreenMediaQuery()
    const { lock, unlock } = useBodyScroll()
    const { cartItems, clear } = useCart()
    const [loading, run] = useLoading()
    const { orderSubmitSuccessPath } = useRoutePath()
    const router = useRouter()
    const localePath = useLocalePath()

    const showDrawer = ref(false)

    const formRef = ref<FormInstance>()
    const form = useStorage('order-checkout-form', {
        name: '',
        company: '',
        email: '',
        phone: '',
        inviteCode: '',
        address: '',
        country: ''
    })

    const hasInviteCode = computed(() => Boolean(form.value.inviteCode))

    const rules = computed<FormRules>(() => ({
        name: [{ required: !hasInviteCode.value, message: $t('Please input {name}', { name: $t('Name').toLocaleLowerCase() }), trigger: 'blur' }],
        company: [{ required: !hasInviteCode.value, message: $t('Please input {name}', { name: $t('Company').toLocaleLowerCase() }), trigger: 'blur' }],
        email: [
            { required: !hasInviteCode.value, message: $t('Please input {name}', { name: $t('Email').toLocaleLowerCase() }), trigger: 'blur' },
            { type: 'email', message: $t('Please input valid Email'), trigger: 'blur' }
        ],
        phone: [{ required: !hasInviteCode.value, message: $t('Please input {name}', { name: $t('Phone').toLocaleLowerCase() }), trigger: 'blur' }],
        address: [{ required: !hasInviteCode.value, message: $t('Please input {name}', { name: $t('Address').toLocaleLowerCase() }), trigger: 'blur' }],
        country: [{ required: !hasInviteCode.value, message: $t('Please input {name}', { name: $t('Country').toLocaleLowerCase() }), trigger: 'blur' }]
    }))

    const handleSubmit = async () => {
        await formRef.value?.validate()

        await run(checkoutOrder({
            ...form.value,
            productList: cartItems.value.map(item => ({
                specificationId: item.specification.id,
                quantity: item.quantity
            }))
        }))

        showDrawer.value = false
        unlock()
        clear()
        router.push(localePath(orderSubmitSuccessPath))
    }
</script>

<template>
    <el-button
        type="primary"
        size="large"
        class="checkout-btn"
        :disabled="cartItems.length === 0"
        @click="showDrawer = true"
    >
        {{ $t('Checkout') }}
    </el-button>

    <el-drawer
        v-model="showDrawer"
        :title="$t('Checkout')"
        :direction="isMobile ? 'btt' : 'rtl'"
        :size="isMobile ? '100%' : '450px'"
        append-to-body
        class="order-checkout-drawer"
        style="max-width: 100%"
        @close="unlock"
        @open="lock"
    >
        <div class="drawer-content">
            <div class="checkout-form-container">
                <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form">
                    <el-form-item :label="$t('Invite Code')" prop="inviteCode">
                        <el-input v-model="form.inviteCode" :placeholder="$t('Optional')" />
                    </el-form-item>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item :label="$t('Name')" prop="name">
                                <el-input v-model="form.name" :placeholder="$t('Name')" :disabled="hasInviteCode" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('Country')" prop="country">
                                <el-input v-model="form.country" :placeholder="$t('Country')" :disabled="hasInviteCode" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item :label="$t('Company')" prop="company">
                        <el-input v-model="form.company" :placeholder="$t('Company')" :disabled="hasInviteCode" />
                    </el-form-item>
                    <el-form-item :label="$t('Address')" prop="address">
                        <el-input v-model="form.address" :placeholder="$t('Address')" :disabled="hasInviteCode" />
                    </el-form-item>
                    <el-form-item :label="$t('Email')" prop="email">
                        <el-input v-model="form.email" :placeholder="$t('Email')" :disabled="hasInviteCode" />
                    </el-form-item>
                    <el-form-item :label="$t('Phone')" prop="phone">
                        <el-input v-model="form.phone" :placeholder="$t('Phone')" :disabled="hasInviteCode" />
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-button
                    type="primary"
                    size="large"
                    class="checkout-btn"
                    :loading="loading"
                    @click="handleSubmit"
                >
                    {{ $t('Send Order') }}
                </el-button>
            </div>
        </div>
    </el-drawer>
</template>

<style scoped lang="less">
.checkout-btn {
    width: 100%;
    height: 48px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
    margin: 0;
}

.drawer-content {
    display: flex;
    flex-direction: column;
    height: 100%;

    .checkout-form-container {
        flex: 1;
        overflow-y: auto;
        padding: 0 20px;
        margin: 0 -20px 20px;
    }
}

:global(.order-checkout-drawer .el-drawer__header) {
    margin-bottom: 0;
}
</style>
