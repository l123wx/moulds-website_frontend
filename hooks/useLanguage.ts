import { computed } from 'vue'
import getLanguage from '~/http/apis/getLanguage'

const useLanguage = () => {
    const { locales } = useI18n()
    const supportLocalesMap = computed(() => {
        const map: Record<string, boolean> = {}
        locales.value.forEach(locale => {
            map[locale.code] = true
        })
        return map
    })

    const { data, pending } = useAsyncData(
        'language',
        () => getLanguage(),
        {
            transform: data => data.data
        }
    )

    const languageList = computed(() => (data.value?.language ?? []).filter(item => supportLocalesMap.value[item.code]))
    const defaultLanguage = computed(() => data.value?.defaultLanguage ?? 'en')

    return {
        defaultLanguage,
        pending,
        languageList
    }
}

let _useLanguage: ReturnType<typeof useLanguage> | null = null
export default () => {
    if (_useLanguage) { return _useLanguage }

    _useLanguage = useLanguage()
    return _useLanguage
}
