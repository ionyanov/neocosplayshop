import { IBaseType } from "@/shared/types/baseType"

export interface IProductAdminProperty {
    id: number,
    propertyId: number,
    property: {
        id: number,
        name: string,
        isList: boolean
    },
    value?: string,
    valueId?: number
    propertyValues?: {
        value: string
    }
}

export interface ICategoryProperties extends IBaseType {
    isList: boolean;
    values: ICategoryPropertyValues[]
}

export interface ICategoryPropertyValues {
    id: number, value: string
}