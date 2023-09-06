import { rtkAPI } from '@/shared/api/rtkAPI';
import { Settings } from '@/shared/types/settings';

const settingsApi = rtkAPI.injectEndpoints({
    endpoints: (build) => ({
        getSettings: build.query<Record<Settings, string>, null>({
            query: () => ({
                url: `/settings`,
                method: 'GET',
            }),
        }),
    }),
});

export const getSettingsQuery = settingsApi.useGetSettingsQuery;
