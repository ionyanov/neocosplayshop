import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { ProductAdminDescription } from '@/entities/ProductDescription';
import { ProductAdminProperty } from '@/entities/ProductProperty';
import { ProductAdminImages } from '@/entities/ProductImages';
import { useGetProduct } from '@/entities/Product';
import { getRouteAdmin, getRouteProductDetail } from '@/shared/const/router';

interface ProductEditCardProps {
    id: number;
}

export const ProductEditCard: FC<ProductEditCardProps> = (args) => {
    const { data, ...dataProps } = useGetProduct(args.id);

    if (dataProps.isLoading || !data) return <></>;

    return (
        <Grid container spacing={2} padding={'10px 5vw'}>
            <Grid item xs={4} columnGap={4}>
                <Button
                    variant="text"
                    sx={{ width: '50%' }}
                    component={RouterLink}
                    to={getRouteAdmin()}>
                    {'< Back'}
                </Button>
                <Button
                    variant="text"
                    component={RouterLink}
                    sx={{ width: '50%' }}
                    to={getRouteProductDetail(args.id.toString())}>
                    {'View'}
                </Button>
                <ProductAdminImages prodId={args.id} />
            </Grid>
            <Grid item xs={8}>
                <Stack direction={'column'} gap={2} margin={'0 20px'}>
                    <Typography variant="h1">{data?.name}</Typography>
                    <ProductAdminProperty prodId={args.id} />
                    <ProductAdminDescription prodId={args.id} />
                </Stack>
            </Grid>
        </Grid>
    );
};
