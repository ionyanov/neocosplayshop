import { type FC, lazy } from 'react';

export const ProductDetailPageAsync = lazy<FC>(async () => await import('./ProductDetailPage'));
