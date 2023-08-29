import {type FC, memo} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError: FC<PageErrorProps> = memo((props: PageErrorProps) => {
    const reloadPage: () => void = () => {
        location.reload();
    };

    return (
        <div className={classNames(cls.PageError, {}, [props.className])}>
            <p>{'Что-то пошло не так'}</p>
            <button onClick={reloadPage}>{'Обновить'}</button>
        </div>
    );
});

PageError.displayName = 'PageError';
