<script setup lang="ts">
    const route = useRoute()
</script>

<template>
    <div>
        <h1>Product Detail</h1>
        {{ route.params.path }}
    </div>
</template>

<style scoped lang="less">

</style>
