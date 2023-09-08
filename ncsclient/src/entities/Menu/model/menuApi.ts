import { rtkAPI } from '@/shared/api/rtkAPI';
import type { Menuitem } from '../types/menuitem';

const menuApi = rtkAPI.injectEndpoints({
    endpoints: (build) => ({
        getMenu: build.query<Menuitem[], null>({
            query: () => ({
                url: `/mainmenu`,
                method: 'GET',
            }),
        }),
    }),
});


export const getMenuQuery = menuApi.useGetMenuQuery;
