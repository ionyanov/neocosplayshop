import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = (props) => {
    return (
        <Page className={cls.notFoundPage}>
            Page not found
        </Page>
    );
};
