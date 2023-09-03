import React, { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { useParams } from 'react-router-dom';

const ProductDetailPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);
    return (
        <Page>Product detail {id}</Page>
    );
};

export default ProductDetailPage;
