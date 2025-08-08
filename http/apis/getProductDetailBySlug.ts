import http from '..'

type Banner = {
    order: number;
    path: string;
    type: 'video' | 'image';
}

type Product = {
    /** 产品ID */
    id: number;

    /** 产品名称 */
    name: string;

    /** 唯一标识符 */
    slug: string;

    /** 产品分类ID */
    productTypeId: number;

    /** 产品分类名称 */
    productTypeName: string;

    /** 产品封面图片路径 */
    coverImagePath: string;

    /** 产品 banner 列表 */
    bannerList: Banner[];

    /** 产品 label */
    label: string;

    /** 产品内容 */
    content: string;

    /** 产品描述 */
    description: string;

    /** 状态（0正常、 1停用） */
    status: string;

    /** 是否已删除（0 否、 1 已删除） */
    isDeleted: string;

    /** 创建时间 */
    createTime: string;

    /** 更新时间 */
    updateTime: string;
}

const getProductDetailBySlug = (slug: string) => {
    return http<{ data: Product}>(`/product/${slug}`, { method: 'GET' })
}

export default getProductDetailBySlug
