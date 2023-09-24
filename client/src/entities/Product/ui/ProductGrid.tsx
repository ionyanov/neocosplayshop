import { FC } from 'react';
import { Grid } from '@mui/material';
import { BorderColor } from '@/shared/ui';
import { ProductMiniCard } from './ProductMiniCard';
import { useGetProductsQuery } from '../model/product.api';

interface ProductGridProps {
    width?: number;
    height?: number;
    gap?: number;
}

export const ProductGrid: FC<ProductGridProps> = (props) => {
    const { width = 300, height = 300, gap = 20 } = props;
    const { data, isLoading } = useGetProductsQuery();

    if (isLoading || !data) {
        return <></>;
    }

    return (
        <>
            <Grid container spacing={gap} justifyContent="space-around">
                {data.map((item) => (
                    <Grid item key={item.id}>
                        <ProductMiniCard
                            content={item}
                            border={30}
                            width={width}
                            height={height - 60}
                            variant={BorderColor.PINK}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
