export interface CreateEventType {
  name: string;
  description: string | undefined;
  initialDate: string;
  finalDate: string | undefined;
  location: string;
  imageUrl: string | undefined;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}