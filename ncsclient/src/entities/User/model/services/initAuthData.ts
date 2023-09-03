import { createAsyncThunk } from '@reduxjs/toolkit';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';
import { getUserDataQuery } from '../api/userApi';
import type { User } from '../types/user';
import { type ThunkConfig } from '@/app/providers/StoreProvider';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (arg, thunkAPI) => {
        const userId = JSON.parse(
            localStorage.getItem(LOCALSTORAGE_USER_KEY) ?? '',
        );
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
