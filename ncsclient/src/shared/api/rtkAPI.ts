import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StorageServices } from '../helpers/auth.helper';

export const rtkAPI = createApi({
    reducerPath: 'rtkAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: _API_URL_,
        prepareHeaders: (headers) => {
            const token = StorageServices.getAccessTokensFromStorage();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({}),
});
