import http from '..'

const getColumnById = (id: number) => {
    return http<any>('/CategoryList/' + id, { method: 'GET' })
}

export default getColumnById
