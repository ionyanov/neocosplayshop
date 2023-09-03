import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from '../..';
import { setJsonSettingsMutation } from '../api/userApi';
import { getJsonSettings } from '../selectors/jsonSettingsSelector';
import type { JsonSettings } from '../types/jsonSettings';
import { StateSchema, ThunkConfig } from '@/app/providers/StoreProvider';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkAPI) => {
    const userData = getUserAuthData(thunkAPI.getState() as StateSchema);
    const currentSettings = getJsonSettings(thunkAPI.getState() as StateSchema);

    if (!userData) {
        return thunkAPI.rejectWithValue('Unknown user');
    }

    try {
        const response = await thunkAPI
            .dispatch(
                setJsonSettingsMutation({
                    userId: userData.id,
                    jsonSettings: { ...currentSettings, ...newJsonSettings },
                }),
            )
            .unwrap();
        if (!response.jsonSettings) {
            return thunkAPI.rejectWithValue('Unknown response');
        }
        return response.jsonSettings;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue('error');
    }
});
