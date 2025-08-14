import http from '..'

const getHomePageProductTypes = () => {
    return http<{ data: any[] }>('/getHomePageProductTypes', { method: 'GET' })
}

export default getHomePageProductTypes
