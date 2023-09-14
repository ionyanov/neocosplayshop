import { createSelector } from '@reduxjs/toolkit';
import { type IUser } from './user.types';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '@/shared/types/router';

export const getUserAuthData: (state: StateSchema) => IUser | undefined = (
    state: StateSchema,
) => {
    return state?.user.authData;
};

export const getUserIsInit: (state: StateSchema) => boolean = (
    state: StateSchema,
) => {
    return state?.user.isInit ?? false;
};

export const getUserRoles: (state: StateSchema) => UserRole = createSelector(
    getUserAuthData,
    (authData) => {
        return authData?.role ?? UserRole.USER;
    },
);

export const getUserAdmin: (state: StateSchema) => boolean = createSelector(
    getUserRoles,
    (roles) => {
        return roles.includes(UserRole.ADMIN);
    },
);
