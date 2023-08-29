import { rtkAPI } from '@/shared/api/rtkAPI';
import type { JsonSettings } from '../types/jsonSettings';
import type { User } from '../types/user';

interface SetJsonSettingsProps {
    userId: string;
    jsonSettings: JsonSettings;
}

const userApi = rtkAPI.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, SetJsonSettingsProps>({
            query: (arg) => ({
                url: `/users/${arg.userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings: arg.jsonSettings,
                },
            }),
        }),
        getUserData: build.query<User, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const setJsonSettingsMutation =
    userApi.endpoints.setJsonSettings.initiate;

export const getUserDataQuery = userApi.endpoints.getUserData.initiate;
