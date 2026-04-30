import api from "../api";

export const getAddressByCep = async (cep: string) => {
    try {
        const response = await api.get(`/address/cep/${cep}`);
        return response;
    } catch (error) {
        throw error;
    }
};