import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataQuery } from '../api/userApi';
import type { IUser } from '../types/IUser';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { StorageServices } from '@/shared/helpers/auth.helper';

export const initAuthData = createAsyncThunk<IUser, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (arg, thunkAPI) => {
        const userId = StorageServices.getUserFromStorage().id;
        if (!userId) {
            return thunkAPI.rejectWithValue('');
        }
        try {
            const response = await thunkAPI
                .dispatch(getUserDataQuery(userId))
                .unwrap();
            return response;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
