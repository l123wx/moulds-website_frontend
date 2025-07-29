import axios, { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import useI18n from '~/hooks/useI18n'

const BASE_URL = 'https://www.w-esc.com/api'
const DEFAULT_TIMEOUT = 10 * 1000

const http = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    timeout: DEFAULT_TIMEOUT
})

const responseInterceptor = (res: AxiosResponse) => {
    const { $t } = useI18n()

    const data = res.data

    if (data.code === 500) {
        ElMessage.error($t('http.error'))
        console.error(data.msg)
        throw new Error(data.msg)
    }

    if (data.code !== 200) {
        if (data.code === 408) {
            ElMessage.error($t('http.phone.code.frequent'))
        } else if (data.code === 412) {
            ElMessage.error(
                $t('signIn.form.registered') + ', ' + $t('signIn.form.waiting.for.review')
            )
        } else {
            ElMessage.error(data.msg)
        }
        console.error(data.msg)
        throw new Error(data.msg)
    }

    return data as any
}

http.interceptors.response.use(responseInterceptor)

export default http
