import { IUser } from "@/entities/User";
import { LOCALSTORAGE_USER_KEY, LOCALSTORAGE_REFRESH_KEY, LOCALSTORAGE_ACCESS_KEY } from "@/shared/const/localstorage";

export const StorageServices = {
    getUserFromStorage(): IUser {
        return (JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_KEY) || '') || {}) as IUser;
    },

    setUserToStorage(data: IUser): void {
        localStorage.setItem(LOCALSTORAGE_USER_KEY, JSON.stringify(data));
    },

    getRefreshTokenFromStorage(): string {
        return localStorage.getItem(LOCALSTORAGE_REFRESH_KEY) ?? '';
    },

    getAccessTokensFromStorage(): string {
        return localStorage.getItem(LOCALSTORAGE_ACCESS_KEY) ?? '';
    },

    setTokensToStorage(props: { refreshToken: string, accessToken: string }) {
        localStorage.setItem(LOCALSTORAGE_REFRESH_KEY, props.refreshToken);
        localStorage.setItem(LOCALSTORAGE_ACCESS_KEY, props.accessToken);
    },

    clearStorage() {
        localStorage.removeItem(LOCALSTORAGE_USER_KEY)
        localStorage.removeItem(LOCALSTORAGE_ACCESS_KEY)
        localStorage.removeItem(LOCALSTORAGE_REFRESH_KEY)
    }
}