import * as React from 'react';
import { FC } from 'react';
import { MenuType } from '../model/menu.type';
import Box from '@mui/material/Box';
import { AppLogo } from '@/shared/ui';
import { MenuItemRoute } from '@/entities/Menu/ui/MenuItemRoute';

interface MenuListDesktopProps {
    isLoading: boolean;
    menu: MenuType[] | undefined;
}

export const MenuListDesktop: FC<MenuListDesktopProps> = (props) => {
    const handleCloseNavMenu = () => {
        //setAnchorElNav(null);
    };

    if (props.isLoading) {
        return (
            <>
                <AppLogo />
                <Box sx={{ flexGrow: 1 }}>
                </Box>
            </>
        );
    }
    return (
        <>
            <AppLogo />
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                {props.menu?.map((item) => (
                    <MenuItemRoute key={item.id} item={item} onClick={handleCloseNavMenu} />
                ))}
            </Box>
        </>
    );
};