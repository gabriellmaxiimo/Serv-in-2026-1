export interface CreateProfessionalDTO {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  area:
    | "MEDICINE"
    | "SECURITY"
    | "FOOD_SERVICE"
    | "BEVERAGES"
    | "CLEANING"
    | "LOGISTICS"
    | "STAFF"
    | "RECEPTION"
    | "TECHNOLOGY";
  role: string;
  birthDate: string;
}
