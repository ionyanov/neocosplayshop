import { FC } from 'react';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import { IProduct } from '@/entities/Product/model/product.type';
import { BorderColor } from '@/shared/ui';
import { ProductMiniCard } from './ProductMiniCard';

interface ProductLineProps {
    title?: string;
    items: IProduct[];
    width?: number;
    height?: number;
    gap?: number;
    variant?: BorderColor;
}

export const ProductLine: FC<ProductLineProps> = (props) => {
    const {
        title,
        items,
        width = 300,
        height = 300,
        gap = 20,
        variant = BorderColor.PINK,
    } = props;
    return (
        <>
            <Typography align={'center'} variant={'h2'}>
                {title}
            </Typography>
            <ImageList
                sx={{
                    gridAutoFlow: 'column',
                    gridTemplateColumns: `repeat(auto-fit, minmax(${width}px,1fr)) !important`,
                    gridAutoColumns: `minmax(${width}px, 1fr)`,
                    justifyItems: 'center',
                }}
                rowHeight={height + 30}
                gap={gap}>
                {props.items.map((item) => (
                    <ImageListItem key={item.id}>
                        <ProductMiniCard
                            content={item}
                            border={10}
                            width={width}
                            height={height - 60}
                            variant={variant}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
};
