import { Settings } from '@/shared/types/settings';

export interface SettingsSchema {
    settings?: Record<Settings, string>;
    isInit: boolean;
    error?: string;
}
