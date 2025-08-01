// const API_URL = 'https://api.themoviedb.org/3'
const API_URL = 'http://localhost:39254/profile/upload'

export default defineEventHandler((event) => {
    // eslint-disable-next-line no-console
    console.log('-------proxyRequest------')
    // eslint-disable-next-line no-console
    console.log(getRequestURL(event))
    const path = event.path.replace(/^\/profile\/upload\//, '')
    // eslint-disable-next-line no-console
    console.log(`${API_URL}/${path}`)
    try {
        // 确保正确转发查询参数、请求体和其他相关数据
        return proxyRequest(event, `${API_URL}/${path}`)
    } catch (e: any) {
        const status = e?.response?.status || 500
        setResponseStatus(event, status)
        console.error(e)
        return {
            error: String(e)
        }
    }
})
