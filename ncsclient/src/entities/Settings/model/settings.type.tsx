import { Settings } from '@/shared/types/settings';

export interface SettingItem {
    id: number;
    name: String;
    value: String;
}

export interface SettingsSchema {
    settings?: Record<Settings, string>;
    isInit: boolean;
    error?: string;
}
