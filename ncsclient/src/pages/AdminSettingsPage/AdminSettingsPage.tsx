import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { SettingEditTable } from '@/entities/Settings';

const AdminSettingsPage: FC = () => {
    return (
        <Page>
            <SettingEditTable
                item={{ id: 1, name: 'Boosty', value: 'dfsdf' }}
            />
        </Page>
    );
};

export default AdminSettingsPage;
