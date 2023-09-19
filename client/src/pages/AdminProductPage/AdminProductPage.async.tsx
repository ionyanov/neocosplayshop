import { type FC, lazy } from 'react';

export const AdminProductPageAsync = lazy<FC>(
    async () => await import('./AdminProductPage'),
);
