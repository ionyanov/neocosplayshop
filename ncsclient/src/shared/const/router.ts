export enum AppRoutes {
    ABOUT = 'about',

    PRODUCTS = 'products',
    PRODUCT_DETAIL = 'product_detail',

    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // must be last
    NOTFOUND = 'notfound',
}

export const getRouteAbout: () => string = () => '/about';
export const getRouteProducts: () => string = () => '/products';
export const getRouteProductDetail: (id: string) => string = (id: string) => `/products/${id}`;
export const getRouteAdmin: () => string = () => '/admin';
export const getRouteForbidden: () => string = () => '/restrictaccess';
export const getRouteNotfound: () => string = () => '*';
