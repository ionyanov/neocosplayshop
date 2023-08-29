import { AboutPage } from '@/pages/AboutPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { WigPage } from '@/pages/WigPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdmin,
    getRouteForbidden,
    getRouteNotfound, getRouteProductDetail,
    getRouteProducts,
} from '@/shared/const/router';
import { type AppRouteProps, UserRole } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.PRODUCTS]: {
        path: getRouteProducts(),
        element: <WigPage />,
    },
    [AppRoutes.PRODUCT_DETAIL]: {
        path: getRouteProductDetail(':id'),
        element: <WigPage />,
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
