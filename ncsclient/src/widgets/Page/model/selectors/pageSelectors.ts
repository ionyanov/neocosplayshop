import { createSelector } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/lib/providers/StoreProvider';
import { type ScrollSchema } from '../types/page';

export const getPageScroll: (state: StateSchema) => ScrollSchema | undefined = (
    state: StateSchema,
) => {
    return state?.page?.scroll ?? {};
};

export const getPageScrollByPath: (state: StateSchema, path: string) => number =
    createSelector(
        getPageScroll,
        (state: StateSchema, path: string) => path,
        (scroll, path) => {
            return scroll?.[path] || 0;
        },
    );
