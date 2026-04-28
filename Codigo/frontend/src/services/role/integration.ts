import api from "../api";
import type { RoleDTO } from "../../types/ProfessionalDTO";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const listRoles = async (): Promise<RoleDTO[]> => {
  try {
    const response = await api.get(`${API_BASE_URL}/roles`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar cargos:", error);
    throw error;
  }
};

export const createRole = async (name: string): Promise<string> => {
  try {
    const response = await api.post(`${API_BASE_URL}/roles`, { name });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar cargo:", error);
    throw error;
  }
};
