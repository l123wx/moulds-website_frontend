import { computed } from 'vue'
import getLanguage from '~/http/apis/getLanguage'

let initialization = false

const useLanguage = () => {
    const { locales, locale } = useI18n()
    const supportLocalesMap = computed(() => {
        const map: Record<string, boolean> = {}
        locales.value.forEach(locale => {
            map[locale.code] = true
        })
        return map
    })

    const { data, pending, refresh } = useAsyncData(
        'getLanguages',
        () => getLanguage(locale.value),
        {
            transform: data => data.data,
            immediate: false
        }
    )

    if (!initialization) {
        refresh()
        initialization = true
    }

    const languageList = computed(() => (data.value?.language ?? []).filter(item => supportLocalesMap.value[item.code]))
    const defaultLanguageCode = computed(() => data.value?.defaultLanguage.code ?? 'en')

    const activeLanguage = computed(() => {
        const languageCode = locale.value
        return data.value?.language.find(item => item.code === languageCode)
    })

    return {
        defaultLanguageCode,
        activeLanguage,
        pending,
        languageList
    }
}

export default useLanguage
