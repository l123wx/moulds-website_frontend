import http from '..'

type PageParams = {
    pageNum?: number
    pageSize?: number
}

const getReCommendedArticleList = (pageParams?: PageParams) => {
    return http.get<any, any>('/articlelistReCommend', {
        params: {
            ...pageParams
        }
    })
}

export default getReCommendedArticleList
