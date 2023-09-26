import React, { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { useParams } from 'react-router-dom';
import { ProductGrid } from '@/entities/Product';
import { Typography } from '@mui/material';

const ProductsPage: FC = () => {
    const { category = '' } = useParams<{ category: string }>();

    return (
        <Page>
            <Typography
                align={'center'}
                variant={'h2'}
                textTransform={'capitalize'}>
                {category}
            </Typography>
            <ProductGrid width={200} height={300} category={category} />
        </Page>
    );
};

export default ProductsPage;
