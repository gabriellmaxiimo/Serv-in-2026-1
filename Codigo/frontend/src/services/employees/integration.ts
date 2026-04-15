import axios from 'axios';
import type { CreateEmployeesType } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const createEmployee = async (employeesData: CreateEmployeesType) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/employees`, employeesData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar funcionario:', error);
        throw error;
    }
}

export const listAllEmployees = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/employees`);
        return response.data;
    } catch (error) {
        console.error('Erro ao listar funcionarios:', error);
        throw error;
    }   
}

export const deleteEmployee = async (employeesID: string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/employees/${employeesID}`);   
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar funcionario:', error);
        throw error;
    }
}

export const updateEmployee = async (
    employeesID: string,
    employeesData: CreateEmployeesType
) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/employees/${employeesID}`,
            employeesData
        );
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar funcionario:', error);
        throw error;
    }
};