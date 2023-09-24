import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { useParams } from 'react-router-dom';
import { ProductCard } from '@/features/ProductCard';

const ProductDetailPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <Page>
            <ProductCard id={Number.parseInt(id ?? '0')} />
        </Page>
    );
};

export default ProductDetailPage;
