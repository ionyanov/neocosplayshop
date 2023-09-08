import { FC, useEffect } from 'react';
import { detectMobileDevice } from '@/shared/lib';
import { MenuListMobile } from '@/entities/Menu/ui/MenuListMobile';
import { MenuListDesktop } from '@/entities/Menu/ui/MenuListDesctop';
import { MenuType } from '@/entities/Menu/model/menu.type';
import { getMenu, getMenuIsInit } from '../model/menu.selectors';
import { initMenu } from '../model/menu.services';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';

interface MenuListProps {}

export const MenuList: FC<MenuListProps> = (props) => {
    const dispatch = useAppDispatch();
    const data = useSelector(getMenu) || [];
    const isInit = useSelector(getMenuIsInit);
    const isMobile = detectMobileDevice();

    useEffect(() => {
        dispatch(initMenu());
    }, []);

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
    if (isInit) newData = [commItem, ...data, aboutItem];
    else newData = [commItem, aboutItem];

    if (isMobile) {
        return <MenuListMobile menu={newData} isLoading={!isInit} />;
    }

    return <MenuListDesktop menu={newData} isLoading={!isInit} />;
};
