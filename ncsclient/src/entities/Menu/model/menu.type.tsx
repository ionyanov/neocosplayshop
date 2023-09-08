export interface Menuitem {
    id: number,
    name: string,
    link: string,
    order: number
}

export interface MenuSchema {
    menu?: Menuitem[],
    isInit: boolean
}