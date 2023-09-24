import { type FC } from 'react';
import { ProductLine } from './ProductLine';
import { useGetPopularProductsQuery } from '../model/product.api';
import { Loader } from '@/shared/ui/Loader';

export const ProductLinePopular: FC = () => {
    const { data, ...dataProps } = useGetPopularProductsQuery();

    if (dataProps.isLoading) return <Loader />;
    return (
        <ProductLine
            items={data ?? []}
            width={200}
            height={300}
            title={'Popular'}
        />
    );
};
