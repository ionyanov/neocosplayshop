import { type FC, lazy } from 'react';

export const WigPageAsync = lazy<FC>(async () => await import('./WigPage'));
