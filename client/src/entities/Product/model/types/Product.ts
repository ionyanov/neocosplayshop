export interface Product {
    id: number,
    name: string,
    link: string,
    order: number,
    animeId: number,
    personageId: number,
    categoryId: number,
    price: number,
    tags: string[],
    description: string[],
    mainimage: string,
    images: string[],
    ready: boolean,
    sales: boolean
}

export interface ProductsSchema {
    menu?: Product[],
    isInit: boolean
}