import http from '..'

const getPhoneCode = (phone: string, uuid: string, code: string) => {
    return http('/phoneValid', {
        method: 'GET',
        params: {
            phone,
            uuid,
            code
        }
    })
}

export default getPhoneCode
