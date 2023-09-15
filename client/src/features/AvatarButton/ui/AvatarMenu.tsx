import {
    getRouteAdmin,
    getRouteAdminCategories,
    getRouteAdminProperties,
    getRouteAdminSettings,
    getRouteAdminUsers,
} from '@/shared/const/router';
import { Button, MenuItem } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export const AvatarAdminMenu = (props: { onClick?: () => void }) => {
    const location = useLocation();

    const adminMenu: Record<string, string> = {
        'Admin panel': getRouteAdmin(),
        'Admin users': getRouteAdminUsers(),
        'Admin settings': getRouteAdminSettings(),
        'Admin categories': getRouteAdminCategories(),
        'Admin properties': getRouteAdminProperties(),
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
                        to={value}>
                        {key}
                    </Button>
                </MenuItem>
            ))}
        </>
    );
};
