import { createSlice } from '@reduxjs/toolkit';
import { SettingsSchema } from './settings.type';
import { deleteSettings, initSettings, upsertSettings } from './settings.services';

const initialState: SettingsSchema = {
	isInit: false,
	settings: { Boosty: '', Email: '', Instagramm: '' }
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(initSettings.pending, (state, action) => {
				state.error = '';
				state.isInit = false;
			})
			.addCase(initSettings.fulfilled, (state, action) => {
				state.settings = action.payload;
				state.isInit = true;
			})
			.addCase(initSettings.rejected, (state, action) => {
				state.isInit = true;
				state.error = action.error.message;
			})
			.addCase(upsertSettings.pending, (state, action) => {
				state.error = '';
				state.isInit = false;
			})
			.addCase(upsertSettings.fulfilled, (state, action) => {
				state.isInit = true;
			})
			.addCase(upsertSettings.rejected, (state, action) => {
				state.isInit = true;
				state.error = action.error.message;
			})
			.addCase(deleteSettings.pending, (state, action) => {
				state.error = '';
				state.isInit = false;
			})
			.addCase(deleteSettings.fulfilled, (state, action) => {
				state.isInit = true;
			})
			.addCase(deleteSettings.rejected, (state, action) => {
				state.isInit = true;
				state.error = action.error.message;
			});
	},
});

export const { actions: settingsActions } = settingsSlice;
export const { reducer: settingsReducer } = settingsSlice;