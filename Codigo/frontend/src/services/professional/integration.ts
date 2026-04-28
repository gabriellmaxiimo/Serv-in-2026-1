import type { CreateProfessionalDTO } from "../../types/CreateProfessionalDTO";
import api from "../api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const createProfessional = async (
  professionalData: CreateProfessionalDTO,
) => {
  try {
    const response = await api.post(`${API_BASE_URL}/professionals`, professionalData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar profissional:", error);
    throw error;
  }
};

export const listAllProfessionals = async (status?: string) => {
  try {
    const params = status ? `?status=${status}` : "";
    const response = await api.get(`${API_BASE_URL}/professionals${params}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar profissionais:", error);
    throw error;
  }
};

export const getProfessionalById = async (professionalId: string) => {
  try {
    const response = await api.get(`${API_BASE_URL}/professionals/${professionalId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar profissional por ID:", error);
    throw error;
  }
};

export const listProfessionalEvents = async (professionalId: string) => {
  try {
    const response = await api.get(`${API_BASE_URL}/professionals/${professionalId}/events`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar eventos do profissional:", error);
    throw error;
  }
};

export const inactivateProfessional = async (professionalId: string) => {
  try {
    const response = await api.patch(`${API_BASE_URL}/professionals/${professionalId}/inactivate`);
    return response.data;
  } catch (error) {
    console.error("Erro ao inativar profissional:", error);
    throw error;
  }
};

export const reactivateProfessional = async (professionalId: string) => {
  try {
    const response = await api.patch(`${API_BASE_URL}/professionals/${professionalId}/reactivate`);
    return response.data;
  } catch (error) {
    console.error("Erro ao reativar profissional:", error);
    throw error;
  }
};
