// const API_URL = 'https://api.themoviedb.org/3'
const API_URL = 'http://localhost:39254/profile/upload'

export default defineEventHandler((event) => {
    // const query = getQuery(event)

    // console.log(getRequestURL(event))
    // console.log(
    //     'Fetching Image API',
    //     {
    //         url: getRequestURL(event).href,
    //         query,
    //         params: event.context.params
    //     }
    // )
    try {
        return proxyRequest(event, `${API_URL}/${event.context.params!.path}`, {
            sendStream: true
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
