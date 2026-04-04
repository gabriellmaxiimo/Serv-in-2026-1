export interface CreateEventType {
  name: string;
  description: string | undefined;
  initialDate: string;
  finalDate: string | undefined;
  location: string;
  imageUrl: string | undefined;
}