import type { FeatureFlag } from '@/shared/types/featureFlag';
import type { JsonSettings } from './jsonSettings';
import { UserRole } from '@/shared/types/router';

export interface IUser {
    id: number;
    email: string;
    //username: string;
    role?: UserRole;
    //avatar?: string;
    //features?: FeatureFlag;
    //jsonSettings?: JsonSettings;
}

export interface IUserSchema {
    authData?: IUser;
    isInit: boolean;
}
