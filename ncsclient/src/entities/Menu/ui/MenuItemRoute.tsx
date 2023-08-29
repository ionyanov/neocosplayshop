import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MenuItem as MUIMenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { Menuitem } from '../model/types/menuitem';

interface MenuItemRouteProps {
    item: Menuitem;
    onClick: (item: Menuitem) => void;
}

export const MenuItemRoute: React.FC<MenuItemRouteProps> = (props) => {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        props.onClick(props.item);
    };

    return (
        <MUIMenuItem onClick={handleClick}>
            <Button component={RouterLink}
                    to={props.item.link}
                    sx={{ my: 1, color: 'black', fontWeight: 'bold', display: 'block' }}
            >
                {props.item.name}
            </Button>
        </MUIMenuItem>
    );
};
