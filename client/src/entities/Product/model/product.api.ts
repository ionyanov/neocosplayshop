import { rtkAPI } from '@/shared/api/rtkAPI';
import { IProduct } from '@/entities/Product/model/product.type';

const productsApi = rtkAPI.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<IProduct[], void>({
            query: () => ({
                url: `/product`,
                method: 'GET',
            }),
        }),
        getPopularProducts: build.query<IProduct[], void>({
            query: () => ({
                url: `/product/popular`,
                method: 'GET',
            }),
        }),
        getSalesProducts: build.query<IProduct[], void>({
            query: () => ({
                url: `/product/sales`,
                method: 'GET',
            }),
        }),
        getProductDetail: build.query<IProduct, string>({
            query: (id: string) => ({
                url: `/product/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const getProductsQuery = productsApi.useGetProductsQuery;
export const getProductDetailQuery = productsApi.useGetProductDetailQuery;
