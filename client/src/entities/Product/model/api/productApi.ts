import { rtkAPI } from '@/shared/api/rtkAPI';
import { Product } from '@/entities/Product/model/types/Product';

const productsApi = rtkAPI.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<Product[], null>({
            query: () => ({
                url: `/products`,
                method: 'GET',
            }),
        }),
        getProductDetail: build.query<Product, string>({
            query: (id: string) => ({
                url: `/products/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const getProductsQuery = productsApi.useGetProductsQuery;
export const getProductDetailQuery = productsApi.useGetProductDetailQuery;
