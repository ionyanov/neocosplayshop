import { rtkAPI } from '@/shared/api/rtkAPI';
import { ICategoryProperties, IProductAdminProperty } from './paproperty.type';

const tag = 'ProductProperties';
const PAPropertiesApi = rtkAPI.enhanceEndpoints({ addTagTypes: [tag] }).injectEndpoints({
    endpoints: (build) => ({
        getCategoryProperties: build.query<ICategoryProperties[], number>({
            query: (prodId) => ({
                url: `/product/${prodId}/catproperties`,
                method: 'GET',
            }),
        }),
        getPAProperties: build.query<IProductAdminProperty[], number>({
            query: (prodId) => ({
                url: `/product/${prodId}/properties`,
                method: 'GET',
            }),
            providesTags: [tag]
        }),
        setPAProperties: build.mutation<undefined, { prodId: number, data: IProductAdminProperty }>({
            query: ({ prodId, data }) => ({
                url: `/product/${prodId}/properties`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [tag]
        }),
        delPAProperties: build.mutation<undefined, { prodId: number, propId: number }>({
            query: ({ prodId, propId }) => ({
                url: `/product/${prodId}/properties/${propId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tag]
        }),
    }),
});

export const { useGetPAPropertiesQuery,
    useSetPAPropertiesMutation,
    useDelPAPropertiesMutation,
    useGetCategoryPropertiesQuery } = PAPropertiesApi;