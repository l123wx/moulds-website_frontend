import http from '..'

type PageParams = {
    pageNum?: number
    pageSize?: number
}

const getArticleListByColumnId = (columnId: number, pageParams?: PageParams) => {
    return http<any>('/articlelist', {
        method: 'GET',
        params: {
            articleFatherColumn: columnId,
            ...pageParams
        }
    })
}

export default getArticleListByColumnId
