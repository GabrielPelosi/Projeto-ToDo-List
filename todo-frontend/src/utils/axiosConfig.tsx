import axios from 'axios'
import { getJwt, refreshAccessToken,setNewJwt } from './jwt'
import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";


const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = getJwt();
    config.headers = {
        'Authorization': token,
        'isRefreshToken': true
    } 
    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}
const onResponse = (response: AxiosResponse) => {
    console.info(`[response] [${JSON.stringify(response)}]`);
    return response;
}

const onResponseError = async (error: AxiosError)  => {
    const originalRequest = error.request;
    const status = error.response ? error.response.status : null

    if (status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await refreshAccessToken();
        localStorage.setItem('jwt-token',`Bearer ${access_token}`)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return axios(originalRequest);
    }
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}

