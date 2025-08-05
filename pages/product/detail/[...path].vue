<script setup lang="ts">
    import useTinyMCEStyle from '~/hooks/useTinyMCEStyle'

    const route = useRoute()

    useTinyMCEStyle()
</script>

<template>
    <div>
        <h1>Product Detail</h1>
        {{ route.params.path }}
    </div>
</template>

<style scoped lang="less">

</style>
