import http from '..'

type Column = {
    categoryEnglishName: string
    categoryId: number
    categoryName: string
    parentCategoryId: number
    routerLink: string
}

const getAllMenu = () => {
    return http<{ data: Column[] }>('/websiteMenu', { method: 'GET' })
}

export default getAllMenu
