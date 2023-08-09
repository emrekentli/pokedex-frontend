import axios from 'axios';
import Router from 'next/router';

const BASE_URL = '/api/';


const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem('token');
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
            window.localStorage.removeItem('token');
            Router.push('/auth/login');
        }
        return Promise.reject(error);
    }
);

export const axiosInstance = apiClient;