import api from "../api"; // seu axios

export const inviteProfessional = async (
  eventId: string,
  professionalId: string
) => {
  return await api.post(
    `/events/${eventId}/professionals/${professionalId}/invite`
  );
};

export const listEventProfessionals = async (eventId: string) => {
  return await api.get(`/events/${eventId}/professionals`);
};

export const removeProfessional = async (
  eventId: string,
  professionalId: string
) => {
  return await api.delete(
    `/events/${eventId}/professionals/${professionalId}`
  );
};