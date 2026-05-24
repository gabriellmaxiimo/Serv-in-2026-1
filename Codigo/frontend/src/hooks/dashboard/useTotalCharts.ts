import { useEffect, useState } from "react";
import { getTotalEmployees, getTotalEvents, getTotalProfessionals } from "../../services/dashboard/integration";

const useTotalCharts = () => {

    const [totalEvents, setTotalEvents] = useState<number>(0);
    const [totalEmployees, setTotalEmployees] = useState<number>(0);
    const [totalProfessionals, setTotalProfessionals] = useState<number>(0);

    const fetchTotalEvents = async () => {
        try {
            const response = await getTotalEvents();
            setTotalEvents(response);
            return response;
        } catch (error) {
            console.error("Error fetching total events:", error);
            return 0;
        }
    }

    const fetchTotalEmployees = async () => {
        try {
            const response = await getTotalEmployees();
            setTotalEmployees(response);
            return response;
        } catch (error) {
            console.error("Error fetching total employees:", error);
            return 0;
        }
    }

    const fetchTotalProfessionals = async () => {
        try {
            const response = await getTotalProfessionals();
            setTotalProfessionals(response);
            return response;
        } catch (error) {
            console.error("Error fetching total professionals:", error);
            return 0;
        }
    }

    useEffect(() => {
        fetchTotalEvents();
        fetchTotalEmployees();
        fetchTotalProfessionals();
    }, [])

    return {
        totalEvents,
        totalEmployees,
        totalProfessionals,
        fetchTotalEvents,
        fetchTotalEmployees,
        fetchTotalProfessionals
    };

}

export default useTotalCharts