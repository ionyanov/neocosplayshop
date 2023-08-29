export * from './model/slice/userSlice';
export { type UserSchema, type User} from './model/types/user';

export {
    getUserAuthData,
    getUserIsInit,
    getUserRoles,
    getUserAdmin,
} from './model/selectors/userSelectors';

export {
    useJsonSettings,
    useJsonSettingsByKey,
} from './model/selectors/jsonSettingsSelector';
export { saveJsonSettings } from './model/services/saveJsonSettings';

export { initAuthData } from './model/services/initAuthData';
