import { createSlice } from '@reduxjs/toolkit';
import { MenuSchema } from './menu.type';
import { initMenu } from './menu.services';

const initialState: MenuSchema = {
	isInit: false,
	menu: [],
	error: ''
};

export const menuSlice = createSlice({
	name: 'mainmenu',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(initMenu.pending, (state, action) => {
				state.error = '';
				state.isInit = false;
			})
			.addCase(initMenu.fulfilled, (state, action) => {
				state.menu = action.payload;
				state.isInit = true;
			})
			.addCase(initMenu.rejected, (state, action) => {
				state.isInit = true;
				state.error = action.error.message;
			});
	},
});

export const { actions: menuActions } = menuSlice;
export const { reducer: menuReducer } = menuSlice;