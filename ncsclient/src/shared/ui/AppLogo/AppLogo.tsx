import { FC } from 'react';
import cls from './AppLogo.module.scss';
import { Link } from 'react-router-dom';
import { getRouteMain } from '@/shared/const/router';

interface AppLogoProps {
    className?: string;
}

export const AppLogo: FC<AppLogoProps> = (props) => {
    return (
        <Link to={getRouteMain()}>
            <div className={cls.AppLogo}>
                <img src={'/image/applogo.png'} />
            </div>
        </Link>
    );
};
