import React, { FC, ReactNode } from 'react';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import { getProductsQuery } from '@/entities/Product/model/api/productApi';
import { Product } from '@/entities/Product/model/types/Product';
import { BorderColor } from '@/shared/ui';
import { ProductMiniCard } from './ProductMiniCard';

interface ProductLineProps {
    title?: string;
    items: ReactNode[];
    width?: number;
    height?: number;
    gap?: number;
}

interface ReducerData {
    data: Product[];
    isLoading: boolean;
}

export const ProductLine: FC<ProductLineProps> = (props) => {
    const {
        title,
        items,
        width = 300,
        height = 300,
        gap = 20,
    } = props;
    const { data, isLoading } = getProductsQuery(null) as ReducerData;

    if (isLoading) {
        return <></>;
    }

    return (
        <>
            <Typography align={'center'} variant={'h2'}>{title}</Typography>
            <ImageList
                sx={{
                    gridAutoFlow: 'column',
                    gridTemplateColumns: `repeat(auto-fit, minmax(${width}px,1fr)) !important`,
                    gridAutoColumns: `minmax(${width}px, 1fr)`,
                }}
                rowHeight={height + 120}
                gap={gap}
            >
                {data.map((item) => (
                    <ImageListItem key={item.id}>
                        <ProductMiniCard content={item}
                                         border={30}
                                         width={width}
                                         height={height - 60}
                                         variant={BorderColor.PINK} />
                    </ImageListItem>))}
            </ImageList>
        </>
    );
};