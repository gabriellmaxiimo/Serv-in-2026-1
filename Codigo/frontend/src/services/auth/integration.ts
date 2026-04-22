import api from '../api';
import type { LoginDataType } from "./types";

export const login = async (loginData: LoginDataType) => {
    const response = await api.post('/auth/login', loginData);
    
    return {
        data: response.data,
        status: response.status
    };
}

export const firstAccess = async (loginData: LoginDataType) => {
    const response = await api.post('/auth/first-access', loginData);
    
    return {
        data: response.data,
        status: response.status
    };
}