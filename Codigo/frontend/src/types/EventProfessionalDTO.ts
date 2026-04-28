export interface EventProfessionalDTO {
  id: string;
  eventId: string;
  eventName: string;
  professionalId: string;
  professionalName: string;
  status: "PENDING_CONFIRMATION" | "CONFIRMED" | "REJECTED" | "CANCELED";
  confirmationToken: string;
  confirmedAt: string | null;
  createdAt: string;
}