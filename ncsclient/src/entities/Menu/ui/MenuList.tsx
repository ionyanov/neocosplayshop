import * as React from 'react';
import { FC } from 'react';
import { getMenuQuery } from '@/entities/Menu/model/api/menuApi';
import { detectMobileDevice } from '@/shared/lib';
import { MenuListMobile } from '@/entities/Menu/ui/MenuListMobile';
import { MenuListDesktop } from '@/entities/Menu/ui/MenuListDesctop';

interface MenuListProps {
}

export const MenuList: FC<MenuListProps> = (props) => {
    const { data, isLoading } = getMenuQuery(null);
    const isMobile = detectMobileDevice();

    if (isMobile) {
        return (
            <MenuListMobile menu={data} isLoading={isLoading} />
        );
    }

    return (
        <MenuListDesktop menu={data} isLoading={isLoading} />
    );
};