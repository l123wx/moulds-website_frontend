import http from '..'

type UserInfo = {
    email: string,
    phone?: string,
    company?: string,
    name?: string,
}

const userConsult = (userInfo: UserInfo, message: string) => {
    return http('/api/userConsultation', {
        method: 'POST',
        body: {
            contactInfo: userInfo,
            content: message
        }
    })
}

export default userConsult
