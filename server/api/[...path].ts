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
        return $fetch(event.context.params!.path, {
            baseURL: API_URL,
            params: {
                language: 'en-US',
                ...query
            },
            headers: {
                Accept: 'application/json'
            }
        })
    } catch (e: any) {
        const status = e?.response?.status || 500
        setResponseStatus(event, status)
        console.error(e)
        return {
            error: String(e)
        }
    }
})
