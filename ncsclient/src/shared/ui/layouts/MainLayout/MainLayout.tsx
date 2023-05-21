import {FC, memo, ReactElement} from 'react';
import cls from './MainLayout.module.scss';

interface MainLayoutProps {
    header: ReactElement;
    content: ReactElement;
    footer: ReactElement;
}

export const MainLayout: FC<MainLayoutProps> = memo((props: MainLayoutProps) => {
    return (
        <div className={cls.MainLayout}>
            <div className={cls.header}>{props.header}</div>
            <div className={cls.content}>{props.content}</div>
            <div className={cls.footer}>{props.footer}</div>
        </div>
    );
});
