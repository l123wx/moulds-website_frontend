<template>
    <el-dialog
        v-model="visible"
        :title="$t('Select Specifications')"
        class="specification-dialog"
        :width="isMobile ? '100%' : '620px'"
        @close="onCancel"
    >
        <div v-if="currentProduct?.id" class="specification-list">
            <el-skeleton animated :loading="pending">
                <template #default>
                    <el-empty v-if="specificationList.length === 0" :description="$t('No data')"></el-empty>
                    <div v-for="s in specificationList" :key="s.id" class="specification-row">
                        <NuxtImg v-if="s.imagePath || currentProduct?.coverImagePath" :src="s.imagePath || currentProduct?.coverImagePath" class="thumb" />
                        <div class="meta">
                            <div class="name">{{ s.name }}</div>
                            <div class="price">
                                <template v-if="s.price != null">{{ formatPrice(s.price) }}</template>
                                <template v-else>{{ $t('Unknown') }}</template>
                            </div>
                        </div>
                        <div class="qty">
                            <el-input-number v-model="quantities[s.id]" :min="0" :step="1" style="width: 100px" size="small" />
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
    import useScreenMediaQuery from '~/hooks/useScreenMediaQuery'
    import getAllSpecificationByProductId from '~/http/apis/getAllSpecificationByProductId'

    const { isMobile } = useScreenMediaQuery()
    const { locale } = useI18n()

    const currentProduct = ref<Product | null>(null)
    const visible = ref(false)

    const emit = defineEmits(['confirm', 'cancel'])

    const { data: specificationList, pending, refresh } = useAsyncData(
        () => `product-${currentProduct.value?.id}-specification-list`,
        () => getAllSpecificationByProductId(currentProduct.value!.id, locale.value),
        {
            transform: data => data.data,
            default: () => [],
            server: false
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

    const onCancel = () => {
        emit('cancel')
        visible.value = false
    }

    const onConfirm = () => {
        const productData = currentProduct.value!
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

    const formatPrice = (p: number) => {
        try {
            return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(p)
        } catch {
            return String(p)
        }
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

    const open = (product: Product) => {
        if (!product) { return }

        currentProduct.value = product
        refresh()
        visible.value = true
    }

    defineExpose({
        open
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
