import { MenuType } from '@/entities/Menu/model/menu.type';
import { UserRole } from '@/shared/types/router';
import { Button, MenuItem } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export const AvatarAdminMenu = (props: { onClick?: () => void }) => {
    const location = useLocation();

    const adminMenu: Record<string, string> = {
        '/admin': 'Admin panel',
        '/admin/users': 'Admin users',
        '/admin/settings': 'Admin settings',
        '/admin/categoryes': 'Admin categoryes',
    };

    return (
        <>
            {Object.entries(adminMenu).map(([key, value]) => (
                <MenuItem onClick={props.onClick} key={key}>
                    <Button
                        variant="text"
                        size="large"
                        sx={{
                            fontWeight: location.pathname == key ? 'bold' : '',
                        }}
                        component={RouterLink}
                        to={key}>
                        {value}
                    </Button>
                </MenuItem>
            ))}
        </>
    );
};
