import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { AdminUserList } from '@/entities/User';

const AdminUsersPage: FC = () => {
    return (
        <Page>
            <AdminUserList />
        </Page>
    );
};

export default AdminUsersPage;
