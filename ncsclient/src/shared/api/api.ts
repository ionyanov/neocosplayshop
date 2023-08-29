import axios from 'axios';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';

export const $api = axios.create({
    baseURL: _API_URL_,
});

$api.interceptors.request.use((value) => {
    value.headers.Authorization = localStorage.getItem(LOCALSTORAGE_USER_KEY);
    return value;
});
