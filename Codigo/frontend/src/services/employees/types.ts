export interface CreateEmployeesType {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    role: boolean;
    birthDate: string;
}

export interface EditEmployeesType {
    name?: string;
    email?: string;
    phone?: string;
    role?: boolean;
    birthDate?: string;
}