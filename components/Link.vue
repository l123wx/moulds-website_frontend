<script setup lang="ts">
    const localePath = useLocalePath()

    withDefaults(
        defineProps<{
            to: string,
            linkType?: string,
            openType?: string
        }>(), {
            linkType: '0',
            openType: '0'
        }
    )
</script>

<template>
    <NuxtLink
        :to="linkType === '0' ? localePath(to) : to"
        :target="openType === '1' ? '_blank' : '_self'"
        class="banner-link"
    >
        <slot />
    </NuxtLink>
</template>

<style scoped lang="less">

</style>
