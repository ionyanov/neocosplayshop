import { IBaseType } from '@/shared/types/baseType';

export interface CategoryType extends IBaseType {
    id: number;
    name: string;
    link: string;
    visible: boolean;
    order: number;
    properties?: CategoryProperty[];
}

export interface CategoryProperty {
    property: IBaseType;
}
