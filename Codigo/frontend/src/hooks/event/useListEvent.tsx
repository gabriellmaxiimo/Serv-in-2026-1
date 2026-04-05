import { useEffect, useState } from "react";
import { listAllEvents } from "../../services/events/integration";
import { openErrorNotification } from "../../components/errorNotification";

const useListEvent = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const eventsData = await listAllEvents();
                setEvents(eventsData);
            } catch (error: any) {
                openErrorNotification("Error ao buscar eventos:", error.response?.data || "Erro interno");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return { events, loading };
};

export default useListEvent;