import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from "@/app/providers/StoreProvider";
import { type CategoryType } from './category.type';
import { AxiosError } from 'axios';

export const initCategories = createAsyncThunk<
	CategoryType[],
	void,
	ThunkConfig<string>
>('category/initCategories', async (_, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.get<CategoryType[]>(
			'/category/all'
		);
		if (!response.data) {
			return thunkAPI.rejectWithValue('no data');
		}
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue('error');
	}
});

export const upsertCategory = createAsyncThunk<
	any,
	CategoryType,
	ThunkConfig<string>
>('category/upsertCategory', async (category, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.post(
			`/category`,
			category
		);
		thunkAPI.dispatch(initCategories());
	} catch (e) {
		if (e instanceof AxiosError) {
			return thunkAPI.rejectWithValue(e.response?.data.message.join('; '));
		}
	}
});

export const deleteCategory = createAsyncThunk<
	any,
	number,
	ThunkConfig<string>
>('category/deleteCategory', async (id, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.delete(
			`/category/${id}`
		);
		thunkAPI.dispatch(initCategories());
	} catch (e) {
		return thunkAPI.rejectWithValue('error');
	}
});