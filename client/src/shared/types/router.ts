import type { RouteProps } from 'react-router-dom';

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
};
