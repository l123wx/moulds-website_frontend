import http from '..'

const getCaptchaImage = () => {
    return http<any>('/captchaImage', { method: 'GET' })
}

export default getCaptchaImage
