import { rtkAPI } from '@/shared/api/rtkAPI';
import type { IProperty, IPropertyValue } from './property.type';

const tag = 'Properties';

const propertyApi = rtkAPI.enhanceEndpoints({ addTagTypes: [tag] }).injectEndpoints({
	endpoints: (build) => ({
		getProperties: build.query<IProperty[], void>({
			query: () => ({
				url: '/properties/admin',
				method: 'GET',
			}),
			providesTags: [tag]
		}),

		upsertProperty: build.mutation<IProperty, IProperty>({
			query: (prop) => ({
				url: '/properties',
				method: 'POST',
				body: prop
			}),
			invalidatesTags: [tag]
		}),
		setPropertyValue: build.mutation<undefined, { propId: number, value: IPropertyValue }>({
			query: ({ propId, value }) => ({
				url: `/properties/${propId}`,
				method: 'POST',
				body: value
			}),
			invalidatesTags: [tag]
		}),
		deleteValue: build.mutation<undefined, { propId: number, valId: number }>({
			query: ({ propId, valId }) => ({
				url: `/properties/${propId}/${valId}`,
				method: 'DELETE'
			}),
			invalidatesTags: [tag]
		})
	}),
});


export const {
	useGetPropertiesQuery,
	useUpsertPropertyMutation,
	useSetPropertyValueMutation,
	useDeleteValueMutation } = propertyApi;
