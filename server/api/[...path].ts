// const API_URL = 'https://api.themoviedb.org/3'

export default defineEventHandler((event) => {
    const config = useRuntimeConfig()
    const API_URL = config.apiUrl
    // eslint-disable-next-line no-console
    console.log('-------proxyRequest------')
    // eslint-disable-next-line no-console
    console.log(getRequestURL(event))
    const path = event.path.replace(/^\/api\//, '')
    // eslint-disable-next-line no-console
    console.log(`${API_URL}/${path}`)
    try {
        // 确保正确转发查询参数、请求体和其他相关数据
        return proxyRequest(event, `${API_URL}/${path}`)
    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error('Error proxying request:', error)
        throw createError({
            statusCode: 500,
            statusMessage: '代理请求失败'
        })
    }
})
