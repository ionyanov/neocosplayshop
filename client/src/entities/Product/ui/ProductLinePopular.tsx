import { type FC } from 'react';
import { ProductLine } from './ProductLine';
import { useGetPopularProductsQuery } from '../model/product.api';

export const ProductLinePopular: FC = () => {
    const { data, ...dataProps } = useGetPopularProductsQuery();

    if (dataProps.isLoading) return <>Loading...</>;
    return (
        <ProductLine
            items={data ?? []}
            width={200}
            height={300}
            title={'Popular'}
        />
    );
};
