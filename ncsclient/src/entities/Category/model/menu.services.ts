import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from "@/app/providers/StoreProvider";
import { type MenuType } from './menu.type';

export const initMenu = createAsyncThunk<
	MenuType[],
	void,
	ThunkConfig<string>
>('category/initMenu', async (_, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.get<MenuType[]>(
			'/category'
		);
		if (!response.data) {
			return thunkAPI.rejectWithValue('no data');
		}
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue('error');
	}
});