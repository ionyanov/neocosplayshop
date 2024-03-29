export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    COMMISSIONS = 'commissions',

    PRODUCTS = 'products',
    PRODUCTS_CATEGORY = 'products_category',
    PRODUCT_DETAIL = 'product_detail',

    //Administration
    ADMIN_PANEL = 'admin_panel',
    ADMIN_PRODUCT = 'admin_product',
    ADMIN_USERS = 'admin_users',
    ADMIN_SETTINGS = 'admin_settings',
    ADMIN_CATEGORIES = 'admin_categories',
    ADMIN_PROPERTIES = 'admin_properties',

    FORBIDDEN = 'forbidden',
    // must be last
    NOTFOUND = 'notfound',
}

export const getRouteMain: () => string = () => '/';
export const getRouteAbout: () => string = () => '/about';
export const getRouteCommissions: () => string = () => '/commissions';
export const getRouteProducts: () => string = () => '/products';
export const getRouteProductsCategory: (category: string) => string = (category: string) => `/products/category/${category}`;
export const getRouteProductDetail: (id: string) => string = (id: string) => `/products/${id}`;

export const getRouteAdmin: () => string = () => '/admin';
export const getRouteAdminProduct: (id: string | number) => string = (id: string | number) => `/admin/${id}`;;
export const getRouteAdminSettings: () => string = () => '/admin/settings';
export const getRouteAdminUsers: () => string = () => '/admin/users';
export const getRouteAdminCategories: () => string = () => '/admin/categories';
export const getRouteAdminProperties: () => string = () => '/admin/properties';

export const getRouteForbidden: () => string = () => '/restrictaccess';
export const getRouteNotfound: () => string = () => '*';

export const getImagePath: (name: string | undefined) => string = (name: string | undefined) => `/images/public/${name}`;
