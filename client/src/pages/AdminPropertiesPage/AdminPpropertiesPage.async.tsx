import { type FC, lazy } from 'react';

export const AdminPpropertiesPageAsync = lazy<FC>(
    async () => await import('./AdminPpropertiesPage'),
);
