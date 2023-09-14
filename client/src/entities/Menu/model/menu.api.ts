import { rtkAPI } from '@/shared/api/rtkAPI';
import type { MenuType } from './menu.type';

const menuApi = rtkAPI.injectEndpoints({
    endpoints: (build) => ({
        getMenu: build.query<MenuType[], null>({
            query: () => ({
                url: `/mainmenu`,
                method: 'GET',
            }),
        }),
    }),
});


export const getMenuQuery = menuApi.useGetMenuQuery;
