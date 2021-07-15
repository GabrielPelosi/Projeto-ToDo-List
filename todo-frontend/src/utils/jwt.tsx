import { BASE_URL } from "./requests"
import axios from 'axios'
import {setupInterceptorsTo} from '../utils/axiosConfig'



type AuthResponse = { 
    jwtToken: string
}
export const getJwt = () => {
    return localStorage.getItem('jwt-token')
}


export const setNewJwt = (jwtToken: string) => {
    const token = JSON.stringify( 'Bearer ' + jwtToken)
    return localStorage.setItem('jwt-token',token)
}


export const  refreshAccessToken = async () => {
    setupInterceptorsTo(axios)
    return axios.get(`${BASE_URL}/auth/refresh-token`)
    .then(response => {
        const authRes = response.data as AuthResponse
        return authRes.jwtToken
    }).catch(err => {
        console.log(err);
    })
}