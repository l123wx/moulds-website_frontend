import http from '..'

type PageParams = {
    pageNum?: number
    pageSize?: number
}

const getReCommendedArticleList = (pageParams?: PageParams) => {
    return http<any>('/articlelistReCommend', {
        method: 'GET',
        params: {
            ...pageParams
        }
    })
}

export default getReCommendedArticleList
