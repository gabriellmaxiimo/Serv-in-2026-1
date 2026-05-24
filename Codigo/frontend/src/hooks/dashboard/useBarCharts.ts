import { useEffect, useState } from "react";
import { getEventsByDate, getProfessionalsByEvent } from "../../services/dashboard/integration";

const useBarCharts = () => {

    const [eventsByProfessional, setEventsByProfessional] = useState<{ description: string; totalprofessionals: number }[]>([]);
    const [eventsByDate, setEventsByDate] = useState<{ period: string; count: number }[]>([]);

    const fetchEventsByProfessional = async () => {
        try {
            const response = await getProfessionalsByEvent();
            setEventsByProfessional(response);
            return response;
        } catch (error) {
            console.error("Error fetching events by professional:", error);
            return [];
        }
    }

    const fetchEventsByDate = async () => {
        try {
            const response = await getEventsByDate();
            setEventsByDate(response);
            return response;
        } catch (error) {
            console.error("Error fetching events by date:", error);
            return [];
        }
    }

    useEffect(() => {
        fetchEventsByProfessional();
        fetchEventsByDate();
    }, []);

    return { eventsByProfessional, eventsByDate, fetchEventsByProfessional, fetchEventsByDate };
}

export default useBarCharts;