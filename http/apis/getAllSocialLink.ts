import http from '..'

type SocialLink = {
  /** 社交链接ID */
  id: number;

  /** 社交链接名称 */
  name: string;

  /** 社交链接地址 */
  url: string;

  /** 社交链接图标 */
  icon: string;

  /** 排序字段 */
  orderNumber: number;

  /** 状态（0正常、1停用） */
  status: string;

  /** 是否已删除（0 否、 1 已删除） */
  isDeleted: string;
}

const getAllSocialLink = () => {
    return http<{ data: SocialLink[] }>('/socialLink', { method: 'GET' })
}

export default getAllSocialLink
