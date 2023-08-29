import * as React from 'react';
import { FC } from 'react';
import { Menuitem } from '../model/types/menuitem';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import { AppLogo } from '@/shared/ui';
import { MenuItemRoute } from '@/entities/Menu/ui/MenuItemRoute';

interface MenuListMobileProps {
    isLoading: boolean;
    menu: Menuitem[];
}

export const MenuListMobile: FC<MenuListMobileProps> = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const appLogo = (<Box sx={{ flexGrow: 0.5 }}>
        <AppLogo />
    </Box>);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    if (props.isLoading) {
        return (
            <>
                <Box sx={{ flexGrow: 0.5 }}>
                    <Skeleton variant='rounded' width={24} height={24} />
                </Box>
                {appLogo}
            </>
        );
    }
    return (
        <>
            <Box sx={{ flexGrow: 0.5 }}>
                <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleOpenNavMenu}
                    color='inherit'
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id='menu-appbar'
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                >
                    {props.menu.map((item) => (
                        <MenuItemRoute key={item.id} item={item} onClick={handleCloseNavMenu} />
                    ))}
                </Menu>
            </Box>
            {appLogo}
        </>
    );
};