import http from '..'

type Product = {
    /** 规格 ID */
    specificationId: number;

    /** 数量 */
    quantity: number;
  }

type OrderInfo = {
  /** 邀请码 */
  inviteCode?: string;

  /** 联系人姓名 */
  name: string;

  /** 国家 */
  country: string;

  /** 公司名称 */
  company: string;

  /** 收货地址 */
  address: string;

  /** 邮箱 */
  email: string;

  /** 电话 */
  phone: string;

  /** 订单产品信息 */
  productList?: Array<Product>;
}

const checkoutOrder = (body: OrderInfo, languageCode: string) => {
    return http('/api/order/checkout', {
        method: 'POST',
        body,
        params: {
            languageCode
        }
    })
}

export default checkoutOrder
