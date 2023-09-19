import { type FC, lazy } from 'react';

export const AdminProductsPageAsync = lazy<FC>(
    async () => await import('./AdminProductsPage'),
);
