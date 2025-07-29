import http from '..'

type PageParams = {
    pageNum?: number
    pageSize?: number
}

const getArticleListByColumnId = (columnId: number, pageParams?: PageParams) => {
    return http.get<any, any>('/articlelist', {
        params: {
            articleFatherColumn: columnId,
            ...pageParams
        }
    })
}

export default getArticleListByColumnId
