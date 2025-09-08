<script setup lang="ts">
    import ShoppingCart from '~/components/Icon/ShoppingCart.vue'
    import SpecificationSelector from '~/components/Product/SpecificationSelector.vue'
    import type { Product } from '~/hooks/useCart'

    const props = defineProps<{
        product: Product
        simple?: boolean
        buttonSize?: '' | 'small' | 'default' | 'large'
    }>()

    const specificationSelectorRef = ref<InstanceType<typeof SpecificationSelector>>()

    const handleClick = () => {
        specificationSelectorRef.value?.open(props.product)
    }
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
        <SpecificationSelector ref="specificationSelectorRef" />
    </ClientOnly>
</template>
