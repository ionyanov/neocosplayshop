import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData, getUserRoles } from '@/entities/User';
import { getRouteForbidden, getRouteProducts } from '@/shared/const/router';
import { UserRole } from '@/shared/types/router';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRole[];
}

export function RequireAuth(props: RequireAuthProps): JSX.Element {
    const auth = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRoles);
    const location = useLocation();

    const hasRequireRoles = useMemo(() => {
        if (props.roles) {
            return props.roles.some((role) => {
                return userRoles.includes(role);
            });
        }

        return true;
    }, [userRoles, props]);

    if (!auth) {
        return (
            <Navigate to={getRouteProducts()} state={{ from: location }} replace />
        );
    }
    if (!hasRequireRoles) {
        return (
            <Navigate
                to={getRouteForbidden()}
                state={{ from: location }}
                replace
            />
        );
    }
    return props.children;
}
