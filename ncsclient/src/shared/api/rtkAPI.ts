import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';

export const rtkAPI = createApi({
    reducerPath: 'rtkAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: _API_URL_,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(LOCALSTORAGE_USER_KEY);
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
