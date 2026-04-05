import axios from 'axios';
import type { CreateEventType } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const createEvent = async (eventData: CreateEventType) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/events`, eventData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar evento:', error);
        throw error;
    }
}

export const listAllEvents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events`);
        return response.data;
    } catch (error) {
        console.error('Erro ao listar eventos:', error);
        throw error;
    }
}