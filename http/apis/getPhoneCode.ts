import http from '..'

const getPhoneCode = (phone: string, uuid: string, code: string) => {
    return http.get('/phoneValid', {
        params: {
            phone,
            uuid,
            code
        }
    })
}

export default getPhoneCode
