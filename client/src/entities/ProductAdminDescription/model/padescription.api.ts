import { rtkAPI } from '@/shared/api/rtkAPI';
import { IProductAdminDescription } from './padescription.type';

const tag = 'ProductDesctiption';
const descriptionApi = rtkAPI.enhanceEndpoints({ addTagTypes: [tag] }).injectEndpoints({
    endpoints: (build) => ({
        getDescriptions: build.query<IProductAdminDescription[], number>({
            query: (prodId) => ({
                url: `/product/${prodId}/description`,
                method: 'GET',
            }),
            providesTags: [tag]
        }),
        setDescription: build.mutation<undefined, { prodId: number, data: IProductAdminDescription }>({
            query: ({ prodId, data }) => ({
                url: `/product/${prodId}/description`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [tag]
        }),
        delDescription: build.mutation<undefined, { prodId: number, descId: number }>({
            query: ({ prodId, descId }) => ({
                url: `/product/${prodId}/description/${descId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tag]
        }),
    }),
});

export const { useGetDescriptionsQuery,
    useSetDescriptionMutation,
    useDelDescriptionMutation } = descriptionApi;