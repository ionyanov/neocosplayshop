export interface CategoryType {
    id: number;
    name: string;
    link: string;
    visible: boolean;
    order: number;
}

export interface CategorySchema {
    categories?: CategoryType[];
    isInit: boolean;
    error?: string;
}
