import { FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { DescriptionTable } from '@/entities/ProductDescription';
import { PropertiesTable } from '@/entities/ProductProperty';
import { ImagesCard } from '@/entities/ProductImages';
import { useGetProduct } from '@/entities/Product';
import { Loader } from '@/shared/ui/Loader';

interface ProductCardProps {
    id: number;
}

export const ProductCard: FC<ProductCardProps> = (args) => {
    const { data, ...dataProps } = useGetProduct(args.id);

    if (dataProps.isLoading || !data) return <Loader />;

    return (
        <Grid container spacing={2} rowGap={2} padding={'10px 5vw'}>
            <Grid item xs={4} rowGap={2} justifyContent={'center'}>
                <ImagesCard prodId={args.id} main={data.mainImage} />
            </Grid>
            <Grid item xs={8}>
                <Stack direction={'column'} gap={2} margin={'0 20px'}>
                    <Typography variant="h1">{data.name}</Typography>
                    <PropertiesTable prodId={args.id} />
                    <DescriptionTable id={args.id} />
                </Stack>
            </Grid>
        </Grid>
    );
};
