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

export const upsertSettings = createAsyncThunk<
	any,
	{ name: string, value: string },
	ThunkConfig<string>
>('settings/upsertSettings', async (params, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.post(
			'/settings',
			{
				name: params.name,
				value: params.value
			}
		);
		thunkAPI.dispatch(initSettings());
	} catch (e) {
		return thunkAPI.rejectWithValue('error');
	}
});

export const deleteSettings = createAsyncThunk<
	any,
	string,
	ThunkConfig<string>
>('settings/deleteSettings', async (name, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.delete(
			`/settings/${name}`
		);
		thunkAPI.dispatch(initSettings());
	} catch (e) {
		return thunkAPI.rejectWithValue('error');
	}
});