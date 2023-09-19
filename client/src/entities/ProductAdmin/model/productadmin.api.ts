import { rtkAPI } from '@/shared/api/rtkAPI';
import { IProductAdmin, IProductAdminDetail } from './productadmin.type';

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
        deleteAdminProduct: build.mutation<undefined, number>({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tag]
        }),
        getAdminProductDetail: build.query<IProductAdminDetail, number>({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'GET',
            }),
            providesTags: [tagDet]
        }),
        setAdminProductDetail: build.mutation<IProductAdminDetail, IProductAdminDetail>({
            query: (args) => ({
                url: `/product/${args.id}`,
                method: 'POST',
                body: args
            }),
            invalidatesTags: [tagDet]
        }),
    }),
});

export const { useGetAdminProductsQuery,
    useSetAdminProductMutation,
    useDeleteAdminProductMutation,
    useGetAdminProductDetailQuery,
    useSetAdminProductDetailMutation } = productsAdminApi;