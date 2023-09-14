import { FC } from 'react';
import { detectMobileDevice } from '@/shared/lib';
import { MenuListMobile } from '@/entities/Menu/ui/MenuListMobile';
import { MenuListDesktop } from '@/entities/Menu/ui/MenuListDesctop';
import { MenuType } from '@/entities/Menu/model/menu.type';
import { getMenuQuery } from '../model/menu.api';

interface MenuListProps {}

export const MenuList: FC<MenuListProps> = (props) => {
    const isMobile = detectMobileDevice();
    const { data = [], isLoading } = getMenuQuery(null);

    const commItem: MenuType = {
        id: 0,
        name: 'Commissions',
        link: '/commissions',
    };
    const aboutItem: MenuType = {
        id: 100,
        name: 'About',
        link: '/about',
    };
    let newData: MenuType[] = [];
    if (!isLoading) newData = [commItem, ...data, aboutItem];
    else newData = [commItem, aboutItem];

    if (isMobile) {
        return <MenuListMobile menu={newData} isLoading={isLoading} />;
    }

    return <MenuListDesktop menu={newData} isLoading={isLoading} />;
};
