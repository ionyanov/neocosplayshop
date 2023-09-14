import { type AppRouteProps, UserRole } from '@/shared/types/router';
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdmin,
    getRouteAdminCategoryes,
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
import { AboutPage } from '@/pages/AboutPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { MainPage } from '@/pages/MainPage';
import { CommissionsPage } from '@/pages/CommissionsPage';
import { AdminCategoryesPage } from '@/pages/AdminCategoryesPage';
import { AdminSettingsPage } from '@/pages/AdminSettingsPage';
import { AdminUsersPage } from '@/pages/AdminUsersPage';

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
        element: <AdminPanelPage />,
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
    [AppRoutes.ADMIN_CATEGORYES]: {
        path: getRouteAdminCategoryes(),
        element: <AdminCategoryesPage />,
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
