import http from '..'

type Column = {
  /** 侧边悬浮菜单ID（自增） */
  id: number;

  /** 菜单名称 */
  name: string;

  /** 菜单标签（用于展示） */
  label: string;

  /** 链接类型（0 内部链接、1 外部链接） */
  linkType: string;

  /** 链接地址 */
  link: string;

  /** 菜单图片 */
  imagePath: string;

  /** 打开类型（0 当前窗口、1 新窗口） */
  openType: string;

  /** 显示顺序 */
  orderNum: number;

  /** 状态（0正常、1停用） */
  status: string;

  /** 是否已删除（0 否、 1 已删除） */
  isDeleted: string;
}

const getAllMenu = () => {
    return http<{ data: Column[] }>('/floatingMenu', { method: 'GET' })
}

export default getAllMenu
