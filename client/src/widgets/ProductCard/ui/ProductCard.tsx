import { FC } from 'react';
import { Button, Grid, Stack, Typography, Link } from '@mui/material';
import { DescriptionTable } from '@/entities/ProductDescription';
import { PropertiesTable } from '@/entities/ProductProperty';
import { ImagesCard } from '@/entities/ProductImages';
import { useGetProduct } from '@/entities/Product';
import { Loader } from '@/shared/ui/Loader';
import { getRouteAbout } from '@/shared/const/router';
import { OrderButton } from '@/features/OrderButton';

interface ProductCardProps {
    id: number;
}

export const ProductCard: FC<ProductCardProps> = (args) => {
    const { data, ...dataProps } = useGetProduct(args.id);

    if (dataProps.isLoading || !data) return <Loader />;

    return (
        <Grid container spacing={2} rowGap={2} padding={'10px 5vw'}>
            <Grid item xs={12} justifyContent={'center'}>
                <Typography variant="h1" textAlign={'center'}>
                    {data.name}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} justifyContent={'center'}>
                <Grid container rowGap={1} justifyContent={'center'}>
                    <OrderButton />
                    <ImagesCard prodId={args.id} main={data.mainImage} />
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container rowGap={2} justifyContent={'center'}>
                    <PropertiesTable prodId={args.id} />
                    <DescriptionTable id={args.id} />
                    <Typography variant="h4" textAlign={'center'}>
                        Please read{' '}
                        <Link href={getRouteAbout()}>
                            the rules of our store!
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};
