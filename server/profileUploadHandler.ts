// const API_URL = 'https://api.themoviedb.org/3'

export default defineEventHandler((event) => {
    const config = useRuntimeConfig()
    const PROFILE_URL = config.profileUrl

    // eslint-disable-next-line no-console
    console.log('-------proxyRequest------')
    // eslint-disable-next-line no-console
    console.log(getRequestURL(event))
    const path = event.path.replace(/^\/profile\/upload\//, '')
    // eslint-disable-next-line no-console
    console.log(`${PROFILE_URL}/${path}`)
    try {
        // 确保正确转发查询参数、请求体和其他相关数据
        return proxyRequest(event, `${PROFILE_URL}/${path}`)
    } catch (e: any) {
        const status = e?.response?.status || 500
        setResponseStatus(event, status)
        console.error(e)
        return {
            error: String(e)
        }
    }
})
