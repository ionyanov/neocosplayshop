import { AboutPage } from '@/pages/AboutPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { MainPage } from '@/pages/MainPage';
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdmin,
    getRouteCommissions,
    getRouteForbidden,
    getRouteMain,
    getRouteNotfound,
    getRouteProductDetail,
    getRouteProducts,
    getRouteProductsCategory,
} from '@/shared/const/router';
import { type AppRouteProps, UserRole } from '@/shared/types/router';
import { CommissionsPage } from '@/pages/CommissionsPage';

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
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },

    [AppRoutes.NOTFOUND]: {
        path: getRouteNotfound(),
        element: <NotFoundPage />,
    },
};
