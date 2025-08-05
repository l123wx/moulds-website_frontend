import http from '..'

type Article = {
    /** 文章ID */
    id: number;

    /** 文章名称 */
    name: string;

    /** 唯一标识符 */
    slug: string;

    /** 文章分类ID */
    articleTypeId: number;

    /** 文章分类名称 */
    articleTypeName: string;

    /** 文章封面图 */
    imagePath: string;

    /** 文章标题 */
    title: string;

    /** 文章内容 */
    content: string;

    /** 文章描述 */
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

const getArticleListByArticleTypeSlug = (slug: string, page: number, pageSize: number) => {
    return http<{ rows: Article[], total: number }>(`/article/listByTypeSlug/${slug}?pageNum=${page}&pageSize=${pageSize}`, { method: 'GET' })
}

export default getArticleListByArticleTypeSlug
