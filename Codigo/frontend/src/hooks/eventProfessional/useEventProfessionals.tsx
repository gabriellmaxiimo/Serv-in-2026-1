import { useEffect, useState } from "react";
import api from "../../services/api"; // seu axios

export const useEventProfessionals = (eventId: string) => {
  const [eventProfessionals, setEventProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEventProfessionals = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/events/${eventId}/professionals`);
      setEventProfessionals(response.data);
    } finally {
      setLoading(false);
    }
  };

  const inviteProfessional = async (professionalId: string) => {
    await api.post(`/events/${eventId}/professionals/${professionalId}/invite`);
    await loadEventProfessionals();
  };

  const removeProfessional = async (professionalId: string) => {
    await api.delete(`/events/${eventId}/professionals/${professionalId}`);
    await loadEventProfessionals();
  };

  useEffect(() => {
    if (eventId) {
      loadEventProfessionals();
    }
  }, [eventId]);

  return {
    eventProfessionals,
    loading,
    inviteProfessional,
    removeProfessional,
  };
};