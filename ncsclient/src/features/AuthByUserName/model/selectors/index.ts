import { type StateSchema } from '@/shared/lib/providers/StoreProvider';

export function index(state: StateSchema): string {
    return state?.loginForm?.error || '';
}

export function getUserName(state: StateSchema): string {
    return state?.loginForm?.username || '';
}

export function getPassword(state: StateSchema): string {
    return state?.loginForm?.password || '';
}

export function getIsLoading(state: StateSchema): boolean {
    return state?.loginForm?.isLoading || false;
}
