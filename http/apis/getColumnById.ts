import http from '..'

const getColumnById = (id: number) => {
    return http.get<any, any>('/CategoryList/' + id)
}

export default getColumnById
