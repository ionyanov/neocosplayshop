import { createAsyncThunk } from '@reduxjs/toolkit';
import { type User, userActions } from '@/entities/User';
import { type ThunkConfig } from '@/shared/lib/providers/StoreProvider';

interface loginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    loginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
    try {
        const response = await thunkAPI.extra.api.post<User>(
            '/login',
            authData,
        );
        if (!response.data) {
            return thunkAPI.rejectWithValue('no data');
        }
        thunkAPI.dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue('error');
    }
});
