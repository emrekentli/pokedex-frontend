import axios from 'axios';
import Router from 'next/router';
import {AuthenticationStore} from "./data/service/store/AuthenticationStore";

const authenticationStore = new AuthenticationStore();

const BASE_URL = '/api/';


const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});



apiClient.interceptors.request.use(
    (config) => {

        const token = authenticationStore.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            authenticationStore.setToken(null);
            Router.push('/auth/login');
        }
        return Promise.reject(error);
    }
);

export const axiosInstance = apiClient;