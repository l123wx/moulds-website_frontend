const signInForm: Record<string, [string, string]> = {
    'please.enter': ['请输入', 'Please Enter '],
    name: ['姓名', 'Name'],
    organization: ['单位', 'Organization'],
    post: ['职务', 'Post'],
    phone: ['手机号码', 'Phone'],
    'enter.correct.phone': ['请输入正确的手机号码', 'Please enter the correct mobile number'],
    code: ['图形验证码', 'Graph Validate Code'],
    phoneCode: ['手机验证码', 'Phone Code'],
    'code.sent': ['验证码已发送', 'The verification code has been sent.'],
    'get.code': ['获取验证码', 'Send Code'],
    email: ['邮箱', 'Email'],
    'enter.correct.email': ['请输入正确的邮箱', 'Please enter the correct email address'],
    submit: ['报名', 'Sign In'],
    'waiting.for.review': [
        '待审核通过后可参加大会',
        'after passing the examination, you can participate in the conference.'
    ],
    registered: ['该手机号已报名', 'The phone number has been registered'],
    'registration.closed': ['报名已截止，将在三秒后返回首页。', 'Registration closed. Returning to the homepage in 3 seconds.']
}

Object.keys(signInForm).forEach(key => {
    Reflect.set(signInForm, 'signIn.form.' + key, signInForm[key])
    delete signInForm[key]
})

export default signInForm
