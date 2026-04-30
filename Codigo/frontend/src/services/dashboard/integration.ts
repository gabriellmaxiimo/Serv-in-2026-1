import api from "../api";

export const totalEvents = async () => {
    try {
        const response = await api.get("/dashboard/total-events");
        return response.data;
    } catch (error) {
        console.error("Error fetching total events:", error);
        throw error;
    }
}