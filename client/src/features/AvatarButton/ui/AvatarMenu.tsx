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
        'Admin products': getRouteAdmin(),
        'Admin categories': getRouteAdminCategories(),
        'Admin properties': getRouteAdminProperties(),
        'Admin settings': getRouteAdminSettings(),
        'Admin users': getRouteAdminUsers(),
    };

    return (
        <>
            {Object.entries(adminMenu).map(([key, value]) => (
                <MenuItem onClick={props.onClick} key={key}>
                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            fontWeight:
                                location.pathname == value ? 'bold' : '',
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
