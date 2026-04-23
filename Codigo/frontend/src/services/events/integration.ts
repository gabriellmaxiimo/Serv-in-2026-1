import axios from 'axios';
import type { CreateEventType } from './types';
import api from '../api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const createEvent = async (eventData: CreateEventType) => {
    try {
        const response = await api.post(`${API_BASE_URL}/events`, eventData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar evento:', error);
        throw error;
    }
}

export const listAllEvents = async () => {
    try {
        const response = await api.get(`${API_BASE_URL}/events`);
        return response.data;
    } catch (error) {
        console.error('Erro ao listar eventos:', error);
        throw error;
    }   
}

export const deleteEvent = async (eventId: number) => {
    try {
        const response = await api.delete(`${API_BASE_URL}/events/${eventId}`);   
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar evento:', error);
        throw error;
    }
}