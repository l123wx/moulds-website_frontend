import http from '..'

type ProductType = {
    /** 分类ID */
    id: number;

    /** 父分类ID */
    parentId: number;

    /** 分类名称 */
    name: string;

    /** 分类标签 */
    label: string;

    /** 唯一标识符（slug） */
    slug: string;

    /** 状态（0正常、1停用） */
    status: string;

    /** 分类图片 */
    imagePath: string;

    /** 是否已删除（0 否、 1 已删除） */
    isDeleted: string;

    /** 创建时间 */
    createTime: string;

    /** 更新时间 */
    updateTime: string;
}

const getAllParentProductTypeBySlug = (slug: string, languageCode: string) => {
    return http<{ data: ProductType[] }>(`/productType/path/${slug}`, {
        method: 'GET',
        params: {
            languageCode
        }
    })
}

export default getAllParentProductTypeBySlug
