export interface IProperty {
    id: number;
    name: string;
    isList: boolean;
    values?: IPropertyValue[];
}

export interface IPropertyValue {
    id?: number;
    value: string;
    isActive: boolean;
}
