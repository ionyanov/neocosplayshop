import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from "@/app/providers/StoreProvider";
import { Settings } from '@/shared/types/settings';

export const initSettings = createAsyncThunk<
	Record<Settings, string>,
	void,
	ThunkConfig<string>
>('settings/initSettings', async (_, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.get<Record<Settings, string>>(
			'/settings'
		);
		if (!response.data) {
			return thunkAPI.rejectWithValue('no data');
		}
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue('error');
	}
});