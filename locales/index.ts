import createLocale from './createLocale'
import signInForm from './signInForm'

export default createLocale({
    signIn: ['报名', 'Sign In'],
    audience: ['观众', 'Audience '],
    media: ['媒体', 'Media '],
    successfully: ['成功', 'Successfully'],
    home: ['首页', 'Home'],
    address: ['地点', 'Address'],
    more: ['更多', 'More'],
    news: ['新闻', 'News'],
    agenda: ['大会日程', 'Agenda'],

    'http.error': ['服务器错误，请联系管理员', 'Server error. Please contact administrator.'],
    'http.phone.code.frequent': [
        '请求过于频繁，请60秒后再次尝试',
        'Request is too frequent, please try again in 60 seconds.'
    ],

    ...signInForm
})
