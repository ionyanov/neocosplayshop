import * as React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MenuItem as MUIMenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { MenuType } from '../model/menu.type';
import { getRouteProductsCategory } from '@/shared/const/router';

interface MenuItemRouteProps {
    item: MenuType;
    onClick: (item: MenuType) => void;
}

export const MenuItemRoute: React.FC<MenuItemRouteProps> = (props) => {
    const location = useLocation();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        props.onClick(props.item);
    };

    return (
        <MUIMenuItem onClick={handleClick}>
            <Button
                variant="text"
                sx={{
                    fontWeight:
                        location.pathname == props.item.link ? 'bold' : '',
                }}
                component={RouterLink}
                to={
                    props.item.isSystem
                        ? props.item.link
                        : getRouteProductsCategory(props.item.link)
                }>
                {props.item.name}
            </Button>
        </MUIMenuItem>
    );
};
