/*declare module '*.scss' {
    type IClassNames = Record<string, string>;

    const classNames: IClassNames;
    export default classNames;
}*/

/*declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}*/

import { Product } from '@/entities/Product/model/types/Product';

declare module '*.png';
declare module '*.jpg';

declare const _IS_DEV_: boolean;
declare const _API_URL_: string;

type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
    }
    : T;

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

interface ReducerData<T> {
    data: T;
    isLoading: boolean;
}