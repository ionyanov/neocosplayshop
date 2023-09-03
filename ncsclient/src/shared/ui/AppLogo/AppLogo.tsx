import { FC } from 'react';
import cls from './AppLogo.module.scss';
import Logo from '../../assets/applogo.png';
import { Link } from 'react-router-dom';
import { getRouteMain } from '@/shared/const/router';

interface AppLogoProps {
    className?: string;
}

export const AppLogo: FC<AppLogoProps> = (props) => {
    return (
        <Link to={getRouteMain()}>
            <div className={cls.AppLogo}>
                <img src={Logo} />
            </div>
        </Link>
    );
};