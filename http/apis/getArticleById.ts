import http from '..'

const getArticleById = (id: number, languageCode: string) => {
    return http<any>('/articlelist/' + id, {
        method: 'GET',
        params: {
            languageCode
        }
    })
}

export default getArticleById
