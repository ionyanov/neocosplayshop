import { type FC, memo } from 'react';
import { Page } from '@/widgets/Page';
import { PropertyEditTable } from '@/entities/Property';

const AdminPpropertiesPage: FC = () => {
    return (
        <Page>
            <PropertyEditTable />
        </Page>
    );
};

export default memo(AdminPpropertiesPage);
