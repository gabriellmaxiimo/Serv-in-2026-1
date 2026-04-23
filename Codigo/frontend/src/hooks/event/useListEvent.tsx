import { useEffect, useState, useMemo, useCallback } from "react";
import { deleteEvent, listAllEvents } from "../../services/events/integration";
import { openErrorNotification } from "../../components/errorNotification";

export interface IEvent {
  id: number;
  name: string;
  description: string;
  initialDate: string;
  finalDate: string | null;
  location: string;
  status: string;
}

const useListEvent = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterName, setFilterName] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterInitialDate, setFilterInitialDate] = useState<string | null>(null);
  const [filterFinalDate, setFilterFinalDate] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string[]>([]);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const eventsData = await listAllEvents();
      setEvents(eventsData);
    } catch (error: any) {
      openErrorNotification(
        "Erro ao buscar eventos:",
        error.response?.data || "Erro interno",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchName = event.name.toLowerCase().includes(filterName.toLowerCase());
      const matchLocation = event.location.toLowerCase().includes(filterLocation.toLowerCase());
      
      const matchInitialDate = filterInitialDate 
        ? new Date(event.initialDate) >= new Date(filterInitialDate) 
        : true;

      const matchFinalDate = filterFinalDate && event.finalDate
        ? new Date(event.finalDate) <= new Date(filterFinalDate)
        : true;

      const matchStatus = filterStatus.length > 0 
        ? filterStatus.includes(event.status) 
        : true;

      return matchName && matchLocation && matchInitialDate && matchFinalDate && matchStatus;
    });
  }, [events, filterName, filterLocation, filterInitialDate, filterFinalDate, filterStatus]);

  const deleteEventById = async (id: number) => {
    try {
      await deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error: any) {
      openErrorNotification(
        "Erro ao deletar evento:",
        error.response?.data || "Erro interno",
      );
    }
  };

  return { 
    events: filteredEvents,
    loading, 
    fetchEvents,
    setFilterName, 
    setFilterLocation, 
    setFilterInitialDate, 
    setFilterFinalDate, 
    setFilterStatus,
    deleteEventById
  };
};

export default useListEvent;