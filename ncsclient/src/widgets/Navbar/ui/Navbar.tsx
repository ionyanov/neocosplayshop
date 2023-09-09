import { FC, useState, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { MenuList } from '@/entities/Menu/ui/MenuList';
import { AvatarButton } from '@/features/AvatarButton';
import { getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { LoginDialog } from '@/features/Login/ui/loginDialog';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Login } from '@mui/icons-material';
import { Button, Container } from '@mui/material';

export const Navbar: FC = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const user = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    const onShowLoginDialog = useCallback(() => {
        setOpenDialog(true);
    }, []);

    const onCloseLoginDialog = useCallback(() => {
        setOpenDialog((prev) => !prev);
    }, []);

    return (
        <AppBar component="nav">
            <Container maxWidth={'100%'}>
                <Toolbar disableGutters>
                    <MenuList />
                    {user && <AvatarButton />}
                    {!user && (
                        <>
                            <Button variant="text" onClick={onShowLoginDialog}>
                                <Login />
                            </Button>
                            <LoginDialog
                                open={openDialog}
                                onClose={onCloseLoginDialog}
                            />
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
