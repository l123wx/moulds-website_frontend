import useRoutePath from '~/hooks/useRoutePath'

export type ProductType = {
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

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const API_URL = config.apiUrl

    // 获取查询参数
    const query = getQuery(event)
    const languageCode = query.languageCode as string

    // eslint-disable-next-line no-console
    console.log('-------proxyRequest------')
    // eslint-disable-next-line no-console
    console.log('请求URL:', getRequestURL(event))
    // eslint-disable-next-line no-console
    console.log('查询参数:', query)
    // eslint-disable-next-line no-console
    console.log('语言代码:', languageCode)

    try {
        const { productTypeListPath, productDetailPath } = useRoutePath()

        const res = await $fetch<{ data: ProductType[] }>(API_URL + '/productType/website/home', {
            method: 'GET',
            params: {
                ...(languageCode && { languageCode })
            }
        })

        const productTypes = res.data as any[]
        if (productTypes?.length) {
            const firstType = productTypes[0]
            const secondType = productTypes[1]

            // 第一个分类获取子分类，第二个分类获取商品

            const firstTypeChildren = await $fetch<{ rows: ProductType[] }>(API_URL + `/productType/subType/${firstType.slug}`, {
                method: 'GET',
                params: {
                    pageNum: 1,
                    pageSize: 100,
                    ...(languageCode && { languageCode })
                }
            })
            const secondTypeProducts = await $fetch<{ rows: ProductType[] }>(API_URL + `/product/getListByTypeSlug/${secondType.slug}`, {
                method: 'GET',
                params: {
                    pageNum: 1,
                    pageSize: 100,
                    ...(languageCode && { languageCode })
                }
            })

            productTypes[0].children = firstTypeChildren.rows
            productTypes[1].children = secondTypeProducts.rows
        }

        const result = productTypes?.map((firstType, index) => {
            return {
                id: firstType.id,
                title: firstType.label,
                image: firstType.imagePath,
                children: index === 0
                    ? firstType.children?.map((subType: any) => {
                        return {
                            id: subType.id,
                            title: subType.label,
                            image: subType.imagePath,
                            href: productTypeListPath([firstType.slug, subType.slug])
                        }
                    })
                    : firstType.children?.map((subProduct: any) => {
                        return {
                            id: subProduct.id,
                            title: subProduct.label,
                            image: subProduct.coverImagePath,
                            href: productDetailPath(subProduct.slug)
                        }
                    })
            }
        })

        // 设置成功状态码
        setResponseStatus(event, 200)
        return {
            data: result,
            code: 200
        }
    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error('Error proxying request:', error)
        throw createError({
            statusCode: 500,
            statusMessage: '代理请求失败'
        })
    }
})
