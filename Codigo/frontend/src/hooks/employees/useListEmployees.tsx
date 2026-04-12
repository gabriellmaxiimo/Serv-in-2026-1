import { useEffect, useState, useMemo, useCallback } from "react";
import { deleteEmployee, listAllEmployees } from "../../services/employees/integration";
import { openErrorNotification } from "../../components/errorNotification";
import { mockEmployee } from "../../mocks/Employee";

export interface iEmployee {
    id: string;
    name: string;
    cpf: string;
    birthDate: string;
    email: string;
    phone: string;
    role: string;
}

const useListEmployees = () => {
    const [employees, setEmployees] = useState<iEmployee[]>([]);
    const [loading, setLoading] = useState(true);

    const [filterName, setFilterName] = useState("");
    const [filterCPF, setFilterCPF] = useState("");
    const [filterBirthDate, setFilterBirthDate] = useState<string | null>(null);
    const [filterEmail, setFilterEmail] = useState("");
    const [filterPhone, setFilterPhone] = useState("");
    const [filterRole, setFilterRole] = useState("");
    

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        try {
            const employeesData = await listAllEmployees();

            console.log("DADOS VINDO DO BACKEND:");
            console.log(employeesData);

            if (!employeesData || employeesData.length === 0) {
                console.log("Backend vazio → usando mock");
                setEmployees(mockEmployee);
            } else {
                setEmployees(employeesData);
            }
        } catch (error: any) {
            console.log("ERRO:", error);
            openErrorNotification(
                "Erro ao buscar funcionarios:",
                error.response?.data?.message || "Erro interno"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {
        const matchName = employee.name.toLowerCase().includes(filterName.toLowerCase());

        const matchCPF = employee.cpf.toLowerCase().includes(filterCPF.toLowerCase());

        const matchBirthDate = filterBirthDate?new Date(employee.birthDate) >= new Date(filterBirthDate):true;
        
        const matchEmail = employee.email.toLowerCase().includes(filterEmail.toLowerCase());

        const matchPhone = employee.phone.toLowerCase().includes(filterPhone.toLowerCase());

        const matchRole = employee.role.toLowerCase().includes(filterRole.toLowerCase());

        return matchName && matchCPF && matchBirthDate && matchEmail && matchPhone && matchRole;
        });
    }, [employees, filterName, filterCPF, filterBirthDate, filterEmail, filterPhone, filterRole]);

    const deleteEmployeeById = async (id: string) => {
        try {
          await deleteEmployee(id);
          setEmployees((prevEmployee) => prevEmployee.filter((employee) => employee.id !== id));
        } catch (error: any) {
          openErrorNotification(
            "Erro ao deletar funcionario:",
            error.response?.data || "Erro interno",
          );
        }
    };

    return { 
        employees: filteredEmployees,
        loading, 
        fetchEmployees,
        setFilterName, 
        setFilterCPF, 
        setFilterBirthDate,
        setFilterEmail, 
        setFilterPhone, 
        setFilterRole,
        deleteEmployeeById
    };
};

export default useListEmployees;