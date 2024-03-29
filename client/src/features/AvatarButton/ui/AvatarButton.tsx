import * as React from 'react';
import { FC } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from '@/entities/User';
import { AvatarAdminMenu } from './AvatarMenu';
import { UserRole } from '@/shared/types/router';
import { Button, Divider } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

export const AvatarButton: FC = () => {
    const dispatch = useAppDispatch();
    const user = useSelector(getUserAuthData);

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    );
    const onLogout = React.useCallback(() => {
        dispatch(userActions.logout());
    }, []);

    const handleOpenUserMenu = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            setAnchorElUser(event.currentTarget);
        },
        [],
    );

    const handleCloseUserMenu = React.useCallback(() => {
        setAnchorElUser(null);
    }, []);

    return (
        <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.email ?? 'ANONIM'} src={user?.avatar} />
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {user?.role == UserRole.ADMIN && (
                    <AvatarAdminMenu onClick={handleCloseUserMenu} />
                )}
                <Divider />
                {user && (
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Button variant="text" onClick={onLogout}>
                            <Logout />
                            Logout
                        </Button>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
};
