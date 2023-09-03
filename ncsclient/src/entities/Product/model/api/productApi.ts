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
    }),
});

export const getProductsQuery = productsApi.useGetProductsQuery;
