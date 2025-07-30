import http from '..'

type Column = {
    categoryEnglishName: string
    categoryId: number
    categoryName: string
    parentCategoryId: number
    routerLink: string
}

const getAllMenu = () => {
    return http.get<any, { rows: Column[] }>('/websiteMenu')
}

export default getAllMenu
