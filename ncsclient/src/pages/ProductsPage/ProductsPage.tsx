import React, { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { useParams } from 'react-router-dom';

const ProductsPage: FC = () => {
    const { category } = useParams<{ category: string }>();
    console.log(category);
    return (
        <Page>Product category {category}</Page>
    );
};

export default ProductsPage;
