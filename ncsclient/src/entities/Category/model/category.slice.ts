import { createSlice } from '@reduxjs/toolkit';
import { CategorySchema } from './category.type';
import { deleteCategory, initCategories, upsertCategory } from './category.services';

const initialState: CategorySchema = {
	isInit: false,
	categories: [],
	error: ''
};

export const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(initCategories.pending, (state, action) => {
				state.error = '';
				state.isInit = false;
			})
			.addCase(initCategories.fulfilled, (state, action) => {
				state.categories = action.payload;
				state.isInit = true;
			})
			.addCase(initCategories.rejected, (state, action) => {
				state.isInit = true;
				state.error = action.error.message;
			})

			.addCase(upsertCategory.pending, (state, action) => {
				state.error = '';
				state.isInit = false;
			})
			.addCase(upsertCategory.fulfilled, (state, action) => {
				state.isInit = true;
			})
			.addCase(upsertCategory.rejected, (state, action) => {
				state.isInit = true;
				state.error = action.payload;
			})

			.addCase(deleteCategory.pending, (state, action) => {
				state.error = '';
				state.isInit = false;
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.isInit = true;
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.isInit = true;
				state.error = action.error.message;
			});
	},
});

export const { actions: categoryActions } = categorySlice;
export const { reducer: categoryReducer } = categorySlice;