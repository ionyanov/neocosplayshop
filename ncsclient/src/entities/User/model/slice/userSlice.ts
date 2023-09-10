import { type PayloadAction } from '@reduxjs/toolkit';
import { setFeatures } from '@/shared/lib/features';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';
import { buildSlice } from '@/shared/lib/store';
import { initAuthData } from '../services/initAuthData';
//import { saveJsonSettings } from '../services/saveJsonSettings';
import type { JsonSettings } from '../types/jsonSettings';
import { type IUser, type IUserSchema } from '../types/IUser';
import { StorageServices } from '@/shared/helpers/auth.helper';

const initialState: IUserSchema = {
    isInit: false,
};

export const userSlice = buildSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload;
            //setFeatures(action.payload.features); 
            StorageServices.setUserToStorage(action.payload)
            state.isInit = true;
        },
        setAuthData2: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload;
            //setFeatures(action.payload.features);
            localStorage.setItem(
                LOCALSTORAGE_USER_KEY,
                JSON.stringify(action.payload),
            );
        },
        /* initAuthData: (state) => {
            const user = localStorage.getItem(LOCALSTORAGE_USER_KEY);
            if (user) {
                state.authData = JSON.parse(user);
                setFeatures(state.authData?.features);
            }
            state.isInit = true;
        }, */
        logout: (state) => {
            StorageServices.clearStorage();
            state.authData = undefined;
        },
    },
    extraReducers: (builder) => {
        /*builder.addCase(
            saveJsonSettings.fulfilled,
            (state, action: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    //state.authData.jsonSettings = action.payload;
                }
            },
        );*/
        builder
            .addCase(
                initAuthData.fulfilled,
                (state, action: PayloadAction<IUser>) => {
                    state.authData = action.payload;
                    //setFeatures(state.authData?.features);
                    state.isInit = true;
                },
            )
            .addCase(initAuthData.rejected, (state) => {
                state.isInit = true;
            });
    },
});

export const {
    actions: userActions,
    reducer: userReducer,
    useActions: useUserActions,
} = userSlice;
