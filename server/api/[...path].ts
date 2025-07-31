// const API_URL = 'https://api.themoviedb.org/3'
const API_URL = 'http://localhost:39254/api'

export default defineEventHandler((event) => {
    const query = getQuery(event)
    // eslint-disable-next-line no-console
    console.log(getRequestURL(event))
    console.log(
        'Fetching TMDB API',
        {
            url: getRequestURL(event).href,
            query,
            params: event.context.params
        }
    )
    try {
        return proxyRequest(event, `${API_URL}/${event.context.params!.path}`)
    } catch (error: any) {
        console.error('Error proxying request:', error)
        throw createError({
            statusCode: 500,
            statusMessage: '代理请求失败'
        })
    }
})
