import { IBaseType } from "@/shared/types/baseType";

export interface IProduct {
    id: number,
    name: string,
    price: number,
    category: IBaseType,
    isOnsales?: boolean,
    isPopular?: boolean,
    mainImage?: {
        id: number,
        link: string,
        description: string
    },
}