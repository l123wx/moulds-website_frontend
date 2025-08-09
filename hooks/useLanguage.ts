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
        'getLanguages',
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

export default useLanguage
