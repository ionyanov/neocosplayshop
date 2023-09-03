import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { MenuList } from '@/entities/Menu/ui/MenuList';

export const Navbar: FC = () => {

    return (
        <>
            <AppBar component='nav'>
                <Toolbar disableGutters>
                    <MenuList />
                </Toolbar>
            </AppBar>
        </>
    );
};