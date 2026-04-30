import { useEffect, useState, useMemo, useCallback } from "react";
import { deleteEmployee, listAllEmployees } from "../../services/employees/integration";
import { openErrorNotification } from "../../components/errorNotification";
import { mockEmployee } from "../../mocks/Employee";
import { updateEmployee } from "../../services/employees/integration";
import { openSuccessNotification } from "../../components/successNotification";

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
    

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        try {
            const employeesData = await listAllEmployees();

            if (!employeesData || employeesData.length === 0) {
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

        return matchName && matchCPF && matchBirthDate && matchEmail && matchPhone;
        });
    }, [employees, filterName, filterCPF, filterBirthDate, filterEmail, filterPhone]);

    const deleteEmployeeById = async (id: string) => {
        try {
          await deleteEmployee(id);
          await fetchEmployees();
          setEmployees((prevEmployee) => prevEmployee.filter((employee) => employee.id !== id));
          openSuccessNotification("Funcionário deletado com sucesso!");
        } catch (error: any) {
          openErrorNotification(
            "Erro ao deletar funcionario:",
            error.response?.data || "Erro interno",
          );
        }
    };

    const fetchUpdateEmployee = async (id: string, data: any) => {
        setLoading(true);
    
        try {
            const response = await updateEmployee(id, data);
    
            if (response) {
                openSuccessNotification("Funcionário atualizado com sucesso!");
            }
    
            return response;
        } catch (error: any) {
            openErrorNotification(
                "Erro ao atualizar funcionário",
                error.response?.data?.message || "Erro interno"
            );
        } finally {
            setLoading(false);
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
        deleteEmployeeById,
        fetchUpdateEmployee
    };
};

export default useListEmployees;