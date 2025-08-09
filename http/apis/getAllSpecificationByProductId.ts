import http from '..'

export type ProductSpecification = {
    /** 产品规格ID */
    id: number;

    /** 产品ID */
    productId: number;

    /** 产品规格名称 */
    name: string;

    /** 产品规格图片路径 */
    imagePath: string;

    /** 价格 */
    price: number;

    /** 备注 */
    remark: string;

    /** 状态（0正常、 1停用） */
    status: string;

    /** 是否已删除（0 否、 1 已删除） */
    isDeleted: string;

    /** 创建时间 */
    createTime: string;

    /** 更新时间 */
    updateTime: string;
}

const getAllSpecificationByProductId = (productId: number) => {
    return http<{ data: ProductSpecification[] }>(`/product/${productId}/specifications`, { method: 'GET' })
}

export default getAllSpecificationByProductId
