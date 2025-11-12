<script setup lang="ts">
    import ShoppingCart from '~/components/Icon/ShoppingCart.vue'
    import SpecificationSelector from '~/components/Product/SpecificationSelector.vue'
    import type { Product } from '~/hooks/useCart'

    const emit = defineEmits(['specificationQuantityChange'])

    const props = defineProps<{
        product: Product
        simple?: boolean
        buttonSize?: '' | 'small' | 'default' | 'large',
        preload?: boolean
    }>()

    const specificationSelectorRef = ref<InstanceType<typeof SpecificationSelector>>()

    const handleClick = () => {
        specificationSelectorRef.value?.open()
    }

    defineExpose({
        changeQuantityByName: (name: string, value: number) => {
            specificationSelectorRef.value?.changeQuantityByName(name, value)
        }
    })
</script>

<template>
    <el-button v-if="simple" plain circle :size="buttonSize" @click="handleClick">
        <el-icon size="20">
            <ShoppingCart />
        </el-icon>
    </el-button>

    <el-button v-else round type="primary" :size="buttonSize" class="add-to-cart-btn" @click="handleClick">
        <el-icon size="20">
            <ShoppingCart />
        </el-icon>
        {{ $t('Add to Cart') }}
    </el-button>

    <ClientOnly>
        <SpecificationSelector ref="specificationSelectorRef" :product="props.product" :preload="props.preload" @change="(...args) => emit('specificationQuantityChange', ...args)" />
    </ClientOnly>
</template>
