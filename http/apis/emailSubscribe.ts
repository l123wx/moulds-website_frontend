import http from '..'

const emailSubscribe = (email: string) => {
    return http('/api/emailSubscription', { method: 'POST', body: { email } })
}

export default emailSubscribe
