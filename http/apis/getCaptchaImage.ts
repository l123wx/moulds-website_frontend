import http from '..'

const getCaptchaImage = () => {
    return http.get<any, any>('/captchaImage')
}

export default getCaptchaImage
