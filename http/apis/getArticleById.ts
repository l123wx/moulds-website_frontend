import http from '..'

const getArticleById = (id: number) => {
    return http<any>('/articlelist/' + id, { method: 'GET' })
}

export default getArticleById
