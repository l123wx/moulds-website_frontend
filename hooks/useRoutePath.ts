const useRoutePath = () => ({
    blogsPath: '/about-us/blogs',
    homePath: '/',
    productCatalogDownloadPath: '/download/product_catalog',
    informationSubmittedSuccessPath: '/success',
    orderSubmitSuccessPath: '/order-submit-success',
    productTypeListPath: (productTypeSlugs: string[]) => `/product/type/${productTypeSlugs.join('/')}`,
    productListPath: (productTypeSlugs: string[]) => `/product/list/${productTypeSlugs.join('/')}`,
    productDetailPath: (productSlug: string) => `/product/detail/${productSlug}`,
    productSearchPath: (keyword: string) => `/product/search?q=${keyword}`,
    articleDetailPath: (articleSlug: string) => `/article/${articleSlug}`
})

export default useRoutePath
