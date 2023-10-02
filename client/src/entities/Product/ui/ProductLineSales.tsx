import { type FC } from 'react';
import { ProductLine } from './ProductLine';
import { useGetSalesProductsQuery } from '../model/product.api';
import { Loader } from '@/shared/ui/Loader';
import { BorderColor } from '@/shared/ui';
import { Settings } from '@/shared/types/enums';
import { getSettings } from '@/entities/Settings';

export const ProductLineSales: FC = () => {
    const { data, ...dataProps } = useGetSalesProductsQuery();
    const border = getSettings(Settings.BORDER, 'WHITE');

    if (dataProps.isLoading) return <Loader />;
    return (
        <ProductLine
            items={data ?? []}
            width={200}
            height={300}
            title={'On sale'}
            variant={BorderColor[border!]}
        />
    );
};
