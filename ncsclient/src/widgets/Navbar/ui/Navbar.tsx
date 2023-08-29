import * as React from 'react';
import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { MainPicture } from '@/shared/ui';
import { AvatarButton } from '@/features/AvatarButton/';
import { MenuList } from '@/entities/Menu/ui/MenuList';


interface NavbarProps {
}

export const Navbar: FC<NavbarProps> = (props) => {

    return (
        <>
            <AppBar  component="nav" color={'transparent'}>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <MenuList />
                        <AvatarButton />
                    </Toolbar>
                </Container>
            </AppBar>
            <MainPicture />
        </>
    );
};