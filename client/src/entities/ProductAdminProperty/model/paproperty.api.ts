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
        getProperties: build.query<IProductAdminProperty[], number>({
            query: (prodId) => ({
                url: `/product/${prodId}/properties`,
                method: 'GET',
            }),
            providesTags: [tag]
        }),
        setProperties: build.mutation<undefined, { prodId: number, data: IProductAdminProperty }>({
            query: ({ prodId, data }) => ({
                url: `/product/${prodId}/properties`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [tag]
        }),
        delProperties: build.mutation<undefined, { prodId: number, descId: number }>({
            query: ({ prodId, descId }) => ({
                url: `/product/${prodId}/properties/${descId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tag]
        }),
    }),
});

export const { useGetPropertiesQuery,
    useSetPropertiesMutation,
    useDelPropertiesMutation,
    useGetCategoryPropertiesQuery } = PAPropertiesApi;