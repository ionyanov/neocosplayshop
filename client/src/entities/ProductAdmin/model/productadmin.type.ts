import { IBaseType } from "@/shared/types/baseType";

export interface IProductAdmin {
    id: number,
    name: string,
    price: number,
    category: IBaseType,
    isOnsales?: boolean,
    isPopular?: boolean,
}

export interface IProductAdminDetail {
    id: number,
    name: string,
    price: number,
    category: IPACategory,
    isOnsales?: boolean,
    isPopular?: boolean,
    properties: IPACatProperties[],
}
export interface IPACategory extends IBaseType {
    properties: IPACatProperties[]
}

export interface IPACatProperties {
    property: IPACatProperty
}

export interface IPACatProperty extends IBaseType {
    isList: boolean,
    values: IPACatPropertyValue[]
}

export interface IPACatPropertyValue {
    id: number,
    value: string
}