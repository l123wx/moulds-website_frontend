import { ElMessage } from 'element-plus'
import useI18n from '~/hooks/useI18n'

const BASE_URL = '/api'
const DEFAULT_TIMEOUT = 10 * 1000

const http = async <T = any>(url: string, options: any = {}) => {
    // 判断是否在客户端环境
    const isClient = process.client

    const i18n = useI18n()
    const { $t, languageCode } = i18n

    try {
        const response = await $fetch<T>(url, {
            baseURL: BASE_URL,
            timeout: DEFAULT_TIMEOUT,
            credentials: 'omit',
            ...options,
            params: {
                ...options.params,
                ...(languageCode ? { languageCode } : {})
            },
            query: {
                ...options.query
            }
        })

        const data = response as any

        if (data.code === 500) {
            // 只在客户端显示错误消息
            if (isClient) { ElMessage.error($t('http.error')) }
            throw new Error(data.msg)
        }

        if (data.code !== 200) {
            // 只在客户端显示错误消息
            if (isClient) {
                if (data.code === 408) {
                    ElMessage.error($t('http.phone.code.frequent'))
                } else if (data.code === 412) {
                    ElMessage.error(
                        $t('signIn.form.registered') + ', ' + $t('signIn.form.waiting.for.review')
                    )
                } else {
                    ElMessage.error(data.msg)
                }
            }
            throw new Error(data.msg)
        }

        return data as T
    } catch (error: any) {
        // 只在客户端显示错误消息
        if (isClient) { ElMessage.error(error.message || $t('http.error')) }
        throw error
    }
}

export default http
