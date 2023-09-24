import { type FC } from 'react';
import { ProductLine } from './ProductLine';
import { useGetSalesProductsQuery } from '../model/product.api';

export const ProductLineSales: FC = () => {
    const { data, ...dataProps } = useGetSalesProductsQuery();

    if (dataProps.isLoading) return <>Loading...</>;
    return (
        <ProductLine
            items={data ?? []}
            width={200}
            height={300}
            title={'On sale'}
        />
    );
};
