import useLanguage from './useLanguage'
import getCurrencies, { type Currency } from '~/http/apis/getCurrencies'

let initialization = false

const usePrice = () => {
    const { activeLanguage } = useLanguage()

    const { data: currencyList, refresh } = useAsyncData(
        'currencyList',
        () => getCurrencies(),
        {
            transform: (data) => data.data,
            default: () => [] as Currency[],
            immediate: false
        }
    )

    if (!initialization) {
        refresh()
        initialization = true
    }

    const activeCurrency = computed(() => {
        return currencyList.value.find(item => item.key === activeLanguage.value?.currencyCode)
    })

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(undefined, { style: 'currency', currency: activeCurrency.value?.key || 'CNY' }).format(price / (activeCurrency.value?.exchangeRate || 1))
    }

    return {
        formatPrice
    }
}

export default usePrice
