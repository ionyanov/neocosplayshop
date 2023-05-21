import {FC} from "react";
import cls from './AppLogo.module.scss';
import Logo from '../../assets/applogo.png'

interface AppLogoProps {
    className?: string
}

export const AppLogo: FC<AppLogoProps> = (props) => {
    return (
        <div className={cls.AppLogo}>
            <img src={Logo}/>
        </div>
    );
};