import { useState } from "react";
import { createEmployee } from "../../services/employees/integration";
import { openErrorNotification } from "../../components/errorNotification";
import { openSuccessNotification } from "../../components/successNotification";
import { Dayjs } from "dayjs";
import { updateEmployee } from "../../services/employees/integration";

const useEmployee = () => {
    const [name, setName] = useState<string>("")
    const [cpf, setCPF] = useState<string>("")
    const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [role, setRole] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false);

    const fetchEmployee = async () => {
        if(name.trim() === "" || cpf.trim() === "" || !birthDate || email.trim() === "" || phone.trim() === ""){
            openErrorNotification("Campos obrigatorio", "Preencha todos os campos.");
            return;
        }
        
        setLoading(true)    

        try{
            const response = await createEmployee({
                name,
                cpf,
                birthDate: birthDate.format("YYYY-MM-DD"),
                email,
                phone,
                role
            });

            if(response){
                openSuccessNotification("Funcionario criado com sucesso!");
            }

            return response;
        }catch(error: any){
            openErrorNotification("Erro ao criar funcionario", error.response?.data?.message || "Erro Interno");
        }finally{
            setLoading(false);
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
        name, setName,
        cpf, setCPF,
        birthDate, setBirthDate,
        email, setEmail,
        phone, setPhone,
        role, setRole,
        fetchEmployee,
        fetchUpdateEmployee,
        loading
    };
}

export default useEmployee;
