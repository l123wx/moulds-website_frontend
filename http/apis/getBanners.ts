import http from '..'

export type Banner = {
    /** Banner ID */
    id: number
    /** Banner 图片路径 */
    imagePath: string
    /** Banner 链接 */
    link: string
    /** 链接类型（0 内部链接、1 外部链接） */
    linkType: string
    /** 打开类型（0 当前窗口、1 新窗口） */
    openType: string
    /** 排序字段 */
    orderNumber: number
    /** 状态（0正常、1停用） */
    status: string
    /** 是否已删除（0 否、 1 已删除） */
    isDeleted: string
}

const getBanners = (languageCode: string) => {
    return http<{ data: Banner[] }>('/banner', {
        method: 'GET',
        params: {
            languageCode
        }
    })
}

export default getBanners
