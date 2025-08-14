import { ElMessage } from 'element-plus'

const BASE_URL = '/api'
const DEFAULT_TIMEOUT = 10 * 1000

const http = async <T = any>(url: string, options: any = {}) => {
    // 判断是否在客户端环境
    const isClient = process.client

    try {
        const response = await $fetch<T>(url, {
            baseURL: BASE_URL,
            ...options,
            timeout: DEFAULT_TIMEOUT,
            credentials: 'omit'
        })

        const data = response as any

        if (data.code === 500) {
            throw new Error(data.msg || $t('http.error'))
        }

        if (data.code !== 200) {
            let message = data.msg || $t('http.error')
            if (isClient) {
                if (data.code === 408) {
                    message = $t('http.phone.code.frequent')
                }

                if (data.code === 412) {
                    message = $t('signIn.form.registered') + ', ' + $t('signIn.form.waiting.for.review')
                }
            }
            throw new Error(message)
        }

        return data as T
    } catch (error: any) {
        // 只在客户端显示错误消息
        if (isClient) { ElMessage.error(error.message || $t('http.error')) }
        throw error
    }
}

export default http
