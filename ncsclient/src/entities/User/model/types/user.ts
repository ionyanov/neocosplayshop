import type { FeatureFlag } from '@/shared/types/featureFlag';
import type { JsonSettings } from './jsonSettings';
import { UserRole } from '@/shared/types/router';

export interface User {
    id: string;
    username: string;
    roles?: UserRole[];
    avatar?: string;
    features?: FeatureFlag;
    jsonSettings?: JsonSettings;
}

export interface UserSchema {
    authData?: User;
    isInit: boolean;
}
