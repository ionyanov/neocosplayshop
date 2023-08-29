import React, { type FC, memo, type ReactNode, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { AppRouteProps } from '@/shared/types/router';
import { routeConfig } from '../model/routeConfig';
import { RequireAuth } from './RequireAuth';
import { CircularProgress } from '@mui/material';

const AppRouter: FC = () => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        const element: ReactNode = (
            <Suspense fallback={<CircularProgress color='inherit' />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth roles={route.roles}>{element}</RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    }, []);
    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);