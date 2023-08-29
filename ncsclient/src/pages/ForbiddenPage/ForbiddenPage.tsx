import { type FC, memo } from 'react';
import { Page } from '@/widgets/Page';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage: FC<ForbiddenPageProps> = (props) => {
    return (
        <Page>Доступ запрещен</Page>
    );
};

export default memo(ForbiddenPage);
