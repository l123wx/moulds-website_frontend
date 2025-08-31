import http from '..'

export type LiveChatTexts = {
    header: string
    autoReply: string
    welcome: string
    tips: string
    submitSuccess: string
}

const getLiveChatTexts = (languageCode: string) => {
    return http<{ data: LiveChatTexts }>('/liveChatTexts', {
        method: 'GET',
        params: {
            languageCode
        }
    })
}

export default getLiveChatTexts
