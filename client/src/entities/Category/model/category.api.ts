import { rtkAPI } from '@/shared/api/rtkAPI';
import type { CategoryType } from './category.type';
const tag = 'Categoryes';
const categoryApi = rtkAPI.enhanceEndpoints({ addTagTypes: [tag] }).injectEndpoints({
	endpoints: (build) => ({
		getCategoryes: build.query<CategoryType[], null>({
			query: () => ({
				url: '/category',
				method: 'GET',
			}),
			providesTags: [tag]
		}),
		upsertCategory: build.mutation<CategoryType, CategoryType>({
			query: (category) => ({
				url: '/category',
				method: 'POST',
				body: category
			}),
			invalidatesTags: [tag]
		}),
		deleteCategory: build.mutation<undefined, number>({
			query: (id) => ({
				url: `/category/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [tag]
		})
	}),
});


export const { useGetCategoryesQuery, useDeleteCategoryMutation, useUpsertCategoryMutation } = categoryApi;
