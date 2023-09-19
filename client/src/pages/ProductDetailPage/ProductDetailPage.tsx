import React, { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { Link, useParams } from 'react-router-dom';
import { getProductDetailQuery } from '@/entities/Product/model/product.api';
import { ReducerData } from '@/shared/types/global';
import { Product } from '@/entities/Product/model/product.type';
import { Grid, Typography } from '@mui/material';
import { BorderColor, BorderedImage } from '@/shared/ui';
import { getRouteAbout } from '@/shared/const/router';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const ProductDetailPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = getProductDetailQuery(
        id ?? '',
    ) as ReducerData<Product>;
    if (!id) return <Page>Product not found</Page>;

    if (isLoading) return <Page>Loading</Page>;

    return (
        <Page>
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="flex-start">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    width={'50%'}>
                    <BorderedImage
                        content={data.mainimage}
                        width={300}
                        height={300}
                        title={data.name}
                        variant={BorderColor.PINK}
                        border={50}
                    />
                    <ImageList variant="masonry" cols={3} gap={8}>
                        {data.images.map((item, index) => (
                            <ImageListItem key={index}>
                                <BorderedImage
                                    content={item}
                                    width={100}
                                    height={100}
                                    variant={BorderColor.WHITE}
                                    border={20}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    width={'50%'}
                    height={'100%'}>
                    <Typography>{data.animeId}</Typography>
                    <Typography>{data.personageId}</Typography>
                    <Typography>{data.tags.join(' ')}</Typography>
                    <Typography>{data.price}</Typography>
                    {data.description.map((item) => (
                        <Typography>{item}</Typography>
                    ))}
                    <Typography>
                        By making order you agree to our{' '}
                        <Link to={getRouteAbout()}>store policy</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Page>
    );
};

export default ProductDetailPage;
