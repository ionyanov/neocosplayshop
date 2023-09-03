import { type FC, lazy } from 'react';

export const CommissionsPageAsync = lazy<FC>(async () => await import('./CommissionsPage'));
