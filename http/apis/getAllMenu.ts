import http from '..'

type Column = {
  /** 菜单ID */
  id: number;

  /** 父菜单ID */
  parentId: number;

  /** 菜单名称 */
  name: string;

  /** 链接类型（0 内部链接、1 外部链接） */
  linkType: string;

  /** 链接地址 */
  link: string;

  /** 菜单封面 */
  imagePath: string;

  /** 打开类型（0 当前窗口、1 新窗口） */
  openType: string;

  /** 显示顺序 */
  orderNum: number;

  /** 是否显示（0 否、1 是） */
  isShow: string;

  /** 菜单标签 */
  label: string;

  /** 状态（0正常、1停用） */
  status: string;

  /** 是否已删除（0 否、 1 已删除） */
  isDeleted: string;
}

const getAllMenu = (languageCode: string) => {
    return http<{ data: Column[] }>('/websiteMenu', {
        method: 'GET',
        params: {
            languageCode
        }
    })
}

export default getAllMenu
