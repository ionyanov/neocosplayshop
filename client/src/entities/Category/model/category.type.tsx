export interface CategoryType {
    id: number;
    name: string;
    link: string;
    visible: boolean;
    order: number;
    properties?: CategoryProperty[];
}

export interface CategoryProperty {
    property: {
        id: number;
        name: string;
    };
}
