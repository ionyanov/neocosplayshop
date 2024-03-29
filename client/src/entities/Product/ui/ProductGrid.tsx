import { FC } from 'react';
import { Grid } from '@mui/material';
import { BorderColor } from '@/shared/ui';
import { ProductMiniCard } from './ProductMiniCard';
import {
    useGetProductsByCategoryQuery,
    useGetProductsQuery,
} from '../model/product.api';
import { Loader } from '@/shared/ui/Loader';

interface ProductGridProps {
    category: string;
    width?: number;
    height?: number;
    gap?: number;
}

export const ProductGrid: FC<ProductGridProps> = (props) => {
    const { width = 300, height = 360, gap = 20 } = props;
    const { data, isLoading } = useGetProductsByCategoryQuery(props.category);

    if (isLoading || !data) {
        return <Loader />;
    }

    return (
        <Grid container spacing={gap} justifyContent="space-around">
            {data.map((item) => (
                <Grid item key={item.id}>
                    <ProductMiniCard
                        content={item}
                        border={10}
                        width={width}
                        height={height - 60}
                        variant={BorderColor.PINK}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
