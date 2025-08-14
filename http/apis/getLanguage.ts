import http from '..'

type Language = {
    /** 语言ID（自增） */
    id: number;

    /** ISO 语言代码 (如 en) */
    code: string;

    /** 语言名称 (如 English) */
    name: string;

    /** 是否为默认语言 */
    isDefault: number;

    /** 货币代码 */
    currencyCode: string;

    /** 是否已删除（0 否、 1 已删除） */
    isDeleted: string;
}

const getLanguage = (languageCode: string) => {
    return http<{ data: { language: Language[], defaultLanguage: string } }>('/language', {
        method: 'GET',
        params: {
            languageCode
        }
    })
}

export default getLanguage
