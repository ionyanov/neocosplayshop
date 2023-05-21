import {FC} from "react";
import cls from './Navbar.module.scss';
import {HStack, VStack} from "../../../shared/ui/Stack";
import {AppLogo} from "../../../shared/ui/AppLogo/AppLogo";
import {AppNavbar} from "../../../features/AppNavbar/AppNavbar";

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = (props) => {
    return (
        <VStack max gap={'8'} className={cls.Navbar}>
            <HStack max gap={'8'} justify={'between'} >
                <AppLogo/>
                <input placeholder={'Поиск'}/>
            </HStack>
            <HStack max gap={'8'} justify={'between'} >
                <AppNavbar/>
            </HStack>
        </VStack>
    );
};