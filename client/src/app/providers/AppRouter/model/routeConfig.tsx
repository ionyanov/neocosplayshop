import { type AppRouteProps, UserRole } from '@/shared/types/router';
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdmin,
    getRouteAdminCategories,
    getRouteAdminProduct,
    getRouteAdminProperties,
    getRouteAdminSettings,
    getRouteAdminUsers,
    getRouteCommissions,
    getRouteForbidden,
    getRouteMain,
    getRouteNotfound,
    getRouteProductDetail,
    getRouteProducts,
    getRouteProductsCategory,
} from '@/shared/const/router';
import {
    MainPage,
    AboutPage,
    CommissionsPage,
    ProductsPage,
    ProductDetailPage,
    AdminProductsPage,
    AdminUsersPage,
    AdminSettingsPage,
    AdminCategoryesPage,
    AdminPpropertiesPage,
    ForbiddenPage,
    NotFoundPage,
    AdminProductPage,
} from '@/pages';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.COMMISSIONS]: {
        path: getRouteCommissions(),
        element: <CommissionsPage />,
    },
    [AppRoutes.PRODUCTS]: {
        path: getRouteProducts(),
        element: <ProductsPage />,
    },
    [AppRoutes.PRODUCTS_CATEGORY]: {
        path: getRouteProductsCategory(':category'),
        element: <ProductsPage />,
    },
    [AppRoutes.PRODUCT_DETAIL]: {
        path: getRouteProductDetail(':id'),
        element: <ProductDetailPage />,
    },

    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <AdminProductsPage />,
        authOnly: true,
        roles: [UserRole.ADMIN],
    },
    [AppRoutes.ADMIN_PRODUCT]: {
        path: getRouteAdminProduct(':id'),
        element: <AdminProductPage />,
        authOnly: true,
        roles: [UserRole.ADMIN],
    },
    [AppRoutes.ADMIN_USERS]: {
        path: getRouteAdminUsers(),
        element: <AdminUsersPage />,
        authOnly: true,
        roles: [UserRole.ADMIN],
    },
    [AppRoutes.ADMIN_SETTINGS]: {
        path: getRouteAdminSettings(),
        element: <AdminSettingsPage />,
        authOnly: true,
        roles: [UserRole.ADMIN],
    },
    [AppRoutes.ADMIN_CATEGORIES]: {
        path: getRouteAdminCategories(),
        element: <AdminCategoryesPage />,
        authOnly: true,
        roles: [UserRole.ADMIN],
    },
    [AppRoutes.ADMIN_PROPERTIES]: {
        path: getRouteAdminProperties(),
        element: <AdminPpropertiesPage />,
        authOnly: true,
        roles: [UserRole.ADMIN],
    },

    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOTFOUND]: {
        path: getRouteNotfound(),
        element: <NotFoundPage />,
    },
};
