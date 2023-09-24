import { IBaseType } from "@/shared/types/baseType";

export interface IProduct {
    id: number,
    name: string,
    price: number,
    category: IBaseType,
    isOnsales?: boolean,
    isPopular?: boolean,
    image?: {
        id: number,
        link: string,
        description: string
    },
}