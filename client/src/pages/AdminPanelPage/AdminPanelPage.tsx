import { type FC, memo } from 'react';
import { Page } from '@/widgets/Page';

interface AdminPanelPageProps {
}

const AdminPanelPage: FC<AdminPanelPageProps> = (props) => {
    return (
        <Page>
            Admin page
        </Page>
    );
};

export default memo(AdminPanelPage);
