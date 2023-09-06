import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { getProductsQuery } from '@/entities/Product/model/api/productApi';
import { Product } from '@/entities/Product/model/types/Product';
import { BorderColor } from '@/shared/ui';
import { ProductMiniCard } from './ProductMiniCard';
import { ReducerData } from '@/shared/types/global';

interface ProductGridProps {
    width?: number;
    height?: number;
    gap?: number;
}

export const ProductGrid: FC<ProductGridProps> = (props) => {
    const {
        width = 300,
        height = 300,
        gap = 20,
    } = props;
    const { data, isLoading } = getProductsQuery(null) as ReducerData<Product[]>;

    if (isLoading) {
        return <></>;
    }

    return (
        <>
            <Grid container spacing={gap} justifyContent='space-around'>
                {data.map((item) => (
                    <Grid item key={item.id}>
                        <ProductMiniCard content={item}
                                         border={30}
                                         width={width}
                                         height={height - 60}
                                         variant={BorderColor.PINK} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};