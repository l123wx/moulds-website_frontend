<template>
    <el-dialog
        v-model="visible"
        :title="$t('Select Specifications')"
        class="specification-dialog"
        :width="isMobile ? '100%' : '620px'"
        @close="onCancel"
    >
        <div v-if="props.product?.id" class="specification-list">
            <el-skeleton animated :loading="pending">
                <template #default>
                    <el-empty v-if="specificationList.length === 0" :description="$t('No data')"></el-empty>
                    <div v-for="s in specificationList" :key="s.id" class="specification-row">
                        <NuxtImg v-if="s.imagePath || props.product?.coverImagePath" format="webp" fit="contain" background="transparent" width="64" height="64" :src="s.imagePath || props.product?.coverImagePath" class="thumb" />
                        <div class="meta">
                            <div class="name">{{ s.name }}</div>
                            <div class="price">
                                <template v-if="s.price != null">{{ formatPrice(s.price) }}</template>
                                <template v-else>{{ $t('Unknown') }}</template>
                            </div>
                        </div>
                        <div class="qty">
                            <el-input-number :model-value="quantities[s.id]" :min="0" :step="1" style="width: 100px" size="small" @change="(val: any) => handleInputNumberChange(s.id, val)" />
                        </div>
                    </div>
                </template>
                <template #template="{ key }">
                    <div :key="key" class="specification-row" :style="key !== 1 ? 'margin-top: 10px' : ''">
                        <el-skeleton-item variant="image" class="thumb" />
                        {{ key }}
                        <div class="meta">
                            <div class="name">
                                <el-skeleton-item variant="text" style="width: 100px" />
                            </div>
                            <div class="price">
                                <el-skeleton-item variant="text" style="width: 100px" />
                            </div>
                        </div>
                    </div>
                </template>
            </el-skeleton>
        </div>
        <template #footer>
            <div class="footer">
                <div class="summary">
                    <span>{{ $t('Total Items') }}: {{ totalItems }}</span>
                    <span>{{ $t('Selected Total') }}: {{ formatPrice(totalPrice) }}</span>
                </div>
                <div class="actions">
                    <el-button @click="onCancel">{{ $t('Cancel') }}</el-button>
                    <el-button type="primary" :disabled="totalItems === 0" @click="onConfirm">
                        {{ $t('Confirm') }}
                    </el-button>
                </div>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import useCart, { type Product } from '~/hooks/useCart'
    import usePrice from '~/hooks/usePrice'
    import useScreenMediaQuery from '~/hooks/useScreenMediaQuery'
    import getAllSpecificationByProductId from '~/http/apis/getAllSpecificationByProductId'

    const { isMobile } = useScreenMediaQuery()
    const { locale } = useI18n()
    const { formatPrice } = usePrice()

    const props = defineProps<{
        product: Product,
        preload?: boolean
    }>()

    const visible = ref(false)

    const emit = defineEmits(['confirm', 'cancel', 'change'])

    const { data: specificationList, pending, refresh } = useAsyncData(
        () => `product-${props.product?.id}-specification-list`,
        () => getAllSpecificationByProductId(props.product!.id, locale.value),
        {
            transform: data => data.data,
            default: () => [],
            server: false,
            immediate: Boolean(props.preload)
        }
    )

    const { addItem } = useCart()

    const quantities = ref<Record<number, number>>({})
    watch(specificationList, () => {
        quantities.value = {}
        for (const s of specificationList.value) {
            quantities.value[s.id] = 0
        }
    })

    const handleInputNumberChange = (id: number, value: number) => {
        changeQuantityById(id, value)

        const specification = specificationList.value.find(item => item.id === id)
        emit('change', specification!.name, value)
    }

    const changeQuantityById = (id: number, value: number) => {
        quantities.value[id] = value
    }

    const changeQuantityByName = (name: string, value: number) => {
        const specification = specificationList.value.find(item => item.name === name)

        if (!specification) {
            // eslint-disable-next-line
            console.warn(`can not found specification named ${name}`)
            return
        }

        changeQuantityById(specification.id, value)
    }

    const onCancel = () => {
        emit('cancel')
        visible.value = false
    }

    const onConfirm = () => {
        const productData = props.product
        specificationList.value.forEach(specification => {
            const quantity = unref(quantities)[specification.id]
            if (quantity > 0) {
                addItem({
                    product: productData,
                    specification,
                    quantity
                })
            }
        })

        visible.value = false
    }

    const totalItems = computed(
        () => Object.values(unref(quantities)).reduce(
            (s, n) => s + (Number(n) || 0),
            0
        )
    )
    const totalPrice = computed(
        () => unref(specificationList).reduce(
            (sum, s) => sum + ((s.price ?? 0) * (unref(quantities)[s.id] || 0)),
            0
        )
    )

    const open = () => {
        !props.preload && refresh()
        visible.value = true
    }

    defineExpose({
        open,
        changeQuantityByName
    })
</script>

<style scoped lang="less">
.specification-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 55vh;
    overflow: auto;
}

.specification-row {
    display: grid;
    grid-template-columns: 64px 1fr auto;
    gap: 12px;
    align-items: center;
    padding: 8px;
    border: 1px solid #eee;
    border-radius: 6px;
}

.thumb {
    width: 64px;
    height: 64px;
    object-fit: contain;
    border-radius: 4px;
}

.meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.qty {
    padding: 0 10px;
}

.name {
    font-weight: 600;
}

.price {
    color: #f56c6c;
}

.footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.summary {
    display: flex;
    gap: 16px;
    align-items: center;
    font-size: 14px;

    @media screen and (max-width: @viewport-md) {
        flex-direction: column;
        gap: 4px;
        align-items: start;
        font-size: 12px;
    }
}
</style>
