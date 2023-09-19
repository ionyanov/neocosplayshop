import { type FC, memo } from 'react';
import { Page } from '@/widgets/Page';
import { ProductsEditTable } from '@/entities/ProductAdmin';

interface AdminProductsPageProps {}

const AdminProductsPage: FC<AdminProductsPageProps> = (props) => {
    return (
        <Page>
            <ProductsEditTable />
        </Page>
    );
};

export default memo(AdminProductsPage);
