import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getRouteMain } from '@/shared/const/router';

interface AppLogoProps {
    className?: string;
}

export const AppLogo: FC<AppLogoProps> = (props) => {
    return (
        <Link to={getRouteMain()}>
            <img
                src={'/images/applogo.png'}
                style={{ maxWidth: '200px', display: 'block' }}
            />
        </Link>
    );
};
