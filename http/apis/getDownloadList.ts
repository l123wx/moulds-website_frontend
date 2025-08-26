import http from '..'

export type DownloadFile = {
  /** 下载ID */
  id: number;

  /** 下载路径 */
  path: string;

  /** 文件名称 */
  name: string;

  /** 文件大小 */
  size: number;

  /** 文件类型 */
  type: string;

  /** 显示顺序 */
  orderNum: number;

  /** 下载标题 */
  label: string;

  /** 创建时间 */
  createTime: string;

  /** 更新时间 */
  updateTime: string;
}

const getDownloadList = ({
    relatedType,
    relatedId,
    page = 1,
    pageSize = 10,
    languageCode
}: {
    relatedType: string,
    relatedId: string,
    page?: number,
    pageSize?: number,
    languageCode: string
}) => {
    return http<{ rows: DownloadFile[], total: number }>(`/download/${relatedType}/${relatedId}`, {
        method: 'GET',
        params: {
            languageCode,
            pageNum: page,
            pageSize
        }
    })
}

export default getDownloadList
