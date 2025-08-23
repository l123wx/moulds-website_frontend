import http from '..'

type Column = {
  /** 联系方式ID */
  id: number;

  /** 名称 */
  name: string;

  /** 地址 */
  address: string;

  /** 电话 */
  phone: string;

  /** 邮箱 */
  email: string;

  /** 网站 */
  website: string;

  /** 图片 */
  imagePath: string;

  /** 显示顺序 */
  orderNum: number;
}

const getAllContactInfo = (languageCode: string) => {
    return http<{ data: Column[] }>('/contactInfo', {
        method: 'GET',
        params: {
            languageCode
        }
    })
}

export default getAllContactInfo
