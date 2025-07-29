const useI18n = () => {
    const ctx = useNuxtApp()

    return {
        $t: ctx.$i18n.t,
        $tt: (zh: string, en: string) => (ctx.$i18n.locale.value === 'en' ? en : zh)
    }
}

export default useI18n
