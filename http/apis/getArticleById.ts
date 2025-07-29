import http from '..'

const getArticleById = (id: number) => {
    return http.get<any, any>('/articlelist/' + id)
}

export default getArticleById
