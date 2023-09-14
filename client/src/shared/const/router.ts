export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    COMMISSIONS = 'commissions',

    PRODUCTS = 'products',
    PRODUCTS_CATEGORY = 'products_category',
    PRODUCT_DETAIL = 'product_detail',

    //Administration
    ADMIN_PANEL = 'admin_panel',
    ADMIN_USERS = 'admin_users',
    ADMIN_SETTINGS = 'admin_settings',
    ADMIN_CATEGORYES = 'admin_categoryes',


    FORBIDDEN = 'forbidden',
    // must be last
    NOTFOUND = 'notfound',
}

export const getRouteMain: () => string = () => '/';
export const getRouteAbout: () => string = () => '/about';
export const getRouteCommissions: () => string = () => '/commissions';
export const getRouteProducts: () => string = () => '/products';
export const getRouteProductsCategory: (category: string) => string = (category: string) => `/products/${category}`;
export const getRouteProductDetail: (id: string) => string = (id: string) => `/products/${id}/info`;

export const getRouteAdmin: () => string = () => '/admin';
export const getRouteAdminUsers: () => string = () => '/admin/users';
export const getRouteAdminCategoryes: () => string = () => '/admin/categoryes';
export const getRouteAdminSettings: () => string = () => '/admin/settings';

export const getRouteForbidden: () => string = () => '/restrictaccess';
export const getRouteNotfound: () => string = () => '*';