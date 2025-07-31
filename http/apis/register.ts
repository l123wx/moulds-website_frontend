import http from '../'

type Params = {
    /**
     * 姓名
     */
    name: String
    /**
     * 单位
     */
    organization: string
    /**
     * 职位
     */
    post: string
    /**
     * 手机号
     */
    phone: string
    /**
     * 手机验证码
     */
    phoneCode: string
    /**
     * 邮箱
     */
    email: string
    /**
     * 报名类型
     * 0: 嘉宾报名, 1: 媒体报名
     */
    type: 0 | 1
}

const register = (params: Params) => {
    return http('/register', {
        method: 'POST',
        query: {
            phoneCode: params.phoneCode
        },
        body: {
            takepartName: params.name,
            takepartPost: params.post,
            takepartPhone: params.phone,
            takepartEmail: params.email,
            takepartType: params.type,
            takepartUnits: params.organization
        }
    })
}

export default register
