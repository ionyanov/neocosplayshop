import { type FC, lazy } from 'react';

export const ProductsPageAsync = lazy<FC>(async () => await import('./ProductsPage'));
