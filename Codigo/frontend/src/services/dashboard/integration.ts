import api from "../api";

export const getTotalEvents = async () => {
    try {
        const response = await api.get(`/dashboard/total-events`);
        return response.data;
    } catch (error) {
        console.error("Error fetching total events:", error);
        throw error;
    }
}

export const getTotalEmployees = async () => {
    try {
        const response = await api.get(`/dashboard/total-employees`);
        return response.data;
    } catch (error) {
        console.error("Error fetching total employees:", error);
        throw error;
    }
}

export const getTotalProfessionals = async () => {
    try {
        const response = await api.get(`/dashboard/total-professionals`);
        return response.data;
    } catch (error) {
        console.error("Error fetching total professionals:", error);
        throw error;
    }
}

export const getProfessionalsByEvent = async () => {
    try {
        const response = await api.get(`/dashboard/professionals-by-event`);
        return response.data;
    } catch (error) {
        console.error("Error fetching professionals by event:", error);
        throw error;
    }
}

export const getEventsByDate = async () => {
    try {
        const response = await api.get(`/dashboard/events-by-date`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events by date:", error);
        throw error;
    }
}