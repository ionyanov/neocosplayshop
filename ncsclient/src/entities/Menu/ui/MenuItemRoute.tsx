import * as React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MenuItem as MUIMenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { Menuitem } from '../model/types/menuitem';

interface MenuItemRouteProps {
    item: Menuitem;
    onClick: (item: Menuitem) => void;
}

export const MenuItemRoute: React.FC<MenuItemRouteProps> = (props) => {
    const location = useLocation();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        props.onClick(props.item);
    };

    return (
        <MUIMenuItem onClick={handleClick}>
            <Button variant='text'
                    sx={{ fontWeight: location.pathname == props.item.link ? 'bold' : '' }}
                    component={RouterLink}
                    to={props.item.link}
            >
                {props.item.name}
            </Button>
        </MUIMenuItem>
    );
};
