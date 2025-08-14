import http from '..'

type PageDetail = {
    /** 单页ID */
    id: number

    /** 单页名称 */
    name: string

    /** 唯一标识符 */
    slug: string

    /** 单页标题 */
    title: string

    /** 单页内容 */
    content: string

    /** 状态（0正常、 1停用） */
    status: string

    /** 是否已删除（0 否、 1 已删除） */
    isDeleted: string

    /** 创建时间 */
    createTime: string

    /** 更新时间 */
    updateTime: string
}

const getPageDetailBySlug = (slug: string, languageCode: string) => {
    return http<{ data: PageDetail }>('/page/' + slug, {
        method: 'GET',
        params: {
            languageCode
        }
    })
}

export default getPageDetailBySlug
