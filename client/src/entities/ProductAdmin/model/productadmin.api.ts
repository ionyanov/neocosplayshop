import { rtkAPI } from '@/shared/api/rtkAPI';
import { IProductAdmin } from './productadmin.type';

const tag = 'ProductAdmin';
const tagDet = 'ProductAdminDetail';
const productsAdminApi = rtkAPI.enhanceEndpoints({ addTagTypes: [tag, tagDet] }).injectEndpoints({
    endpoints: (build) => ({
        getAdminProducts: build.query<IProductAdmin[], void>({
            query: () => ({
                url: `/product`,
                method: 'GET',
            }),
            providesTags: [tag]
        }),
        setAdminProduct: build.mutation<IProductAdmin, IProductAdmin>({
            query: (data) => ({
                url: `/product`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [tag]
        }),
        delAdminProduct: build.mutation<undefined, number>({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tag]
        }),
    }),
});

export const { useGetAdminProductsQuery,
    useSetAdminProductMutation,
    useDelAdminProductMutation } = productsAdminApi;