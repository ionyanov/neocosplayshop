import {FC} from "react";
import cls from './AppNavbar.module.scss';
import {HStack} from "../../shared/ui/Stack";

interface AppNavbarProps {
    className?: string
}

export const AppNavbar: FC<AppNavbarProps> = (props) => {
    return (
        <HStack className={cls.AppNavbar} gap={'16'}>
            <a href={'sdfsd'}>Костюм</a>
            <a href={'sdfsd'}>Костюм2</a>
            <a href={'sdfsd'}>Костюм3</a>
            <a href={'sdfsd'}>Костюм4</a>
        </HStack>
    );
};