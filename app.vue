<template>
    <NuxtLayout>
        <UApp :locale="locales[_locale]">
            <NuxtPage />
        </UApp>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import * as locales from '@nuxt/ui/locale'

    const { locale } = useI18n()
    // eslint-disable-next-line import/namespace
    const lang = computed(() => locales[_locale.value].code)
    // eslint-disable-next-line import/namespace
    const dir = computed(() => locales[_locale.value].dir)

    const _locale = computed(() => locale.value === 'zh' ? 'zh_cn' : locale.value)

    useHead({
        htmlAttrs: {
            lang,
            dir
        }
    })
</script>
