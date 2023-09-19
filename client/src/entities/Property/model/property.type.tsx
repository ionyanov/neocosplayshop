export interface IProperty {
    id: number;
    name: string;
    isList: boolean;
    order: number;
    values?: IPropertyValue[];
}

export interface IPropertyValue {
    id?: number;
    value: string;
    isActive: boolean;
}
