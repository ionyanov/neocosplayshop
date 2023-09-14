import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {type PageSchema} from '../types/page';

const initialState: PageSchema = {
    scroll: {},
};

const pageSlice = createSlice({
    name: 'pageSlice',
    initialState,
    reducers: {
        setScrollPosition: (
            state: PageSchema,
            action: PayloadAction<{ path: string; scroll: number }>,
        ) => {
            state.scroll[action.payload.path] = action.payload.scroll;
        },
    },
});

export const {actions: pageAction} = pageSlice;
export const {reducer: pageReducer} = pageSlice;
