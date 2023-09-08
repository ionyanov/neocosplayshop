export interface MenuType {
    id: number;
    name: string;
    link: string;
}

export interface MenuSchema {
    menu?: MenuType[];
    isInit: boolean;
    error?: string;
}
