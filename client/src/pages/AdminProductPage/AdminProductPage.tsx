import { type FC, memo } from 'react';
import { Page } from '@/widgets/Page';
import { useParams } from 'react-router-dom';
import { ProductEditCard } from '@/features/ProductEdit';

const AdminProductPage: FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <Page>Product not found</Page>;
    if (Number.isNaN(+id)) return <Page>Product not found</Page>;

    return (
        <Page>
            <ProductEditCard id={+id} />
        </Page>
    );
};

export default memo(AdminProductPage);
