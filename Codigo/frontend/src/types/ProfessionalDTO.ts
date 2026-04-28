export interface RoleDTO {
  id: string;
  name: string;
}

export interface ProfessionalDTO {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  phone: string;
  area: string;
  role: RoleDTO;
  status: "AVAILABLE" | "INACTIVE";
}
