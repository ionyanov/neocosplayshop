import { type FC } from 'react';
import { ProductLine } from './ProductLine';
import { useGetPopularProductsQuery } from '../model/product.api';
import { Loader } from '@/shared/ui/Loader';
import { getSettings } from '@/entities/Settings';
import { Settings } from '@/shared/types/enums';
import { BorderColor } from '@/shared/ui';

export const ProductLinePopular: FC = () => {
    const { data, ...dataProps } = useGetPopularProductsQuery();
    const border = getSettings(Settings.BORDER_POPULAR, 'WHITE');

    if (dataProps.isLoading) return <Loader />;
    return (
        <ProductLine
            items={data ?? []}
            width={200}
            height={300}
            title={'Popular'}
            variant={BorderColor[border!]}
        />
    );
};
