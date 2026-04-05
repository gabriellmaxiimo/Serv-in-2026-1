import axios from 'axios';
import type { CreateEventType } from './types';

const API_BASE_URL = 'http://localhost:8080/';

export const createEvent = async (eventData: CreateEventType) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/events`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
}