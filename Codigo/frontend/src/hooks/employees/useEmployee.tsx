import { useState } from "react";
import { createEmployee } from "../../services/employees/integration";
import { openErrorNotification } from "../../components/errorNotification";
import { openSuccessNotification } from "../../components/successNotification";
import { Dayjs } from "dayjs";

const useEmployee = () => {
    const [name, setName] = useState<string>("")
    const [cpf, setCPF] = useState<string>("")
    const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [role, setRole] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false);

    const fetchEmployee = async () => {
        if(name.trim() === "" || cpf.trim() === "" || !birthDate || email.trim() === "" || phone.trim() === "" || role.trim() === ""){
            openErrorNotification("Campos obrigatorio", "Preencha todos os campos.");
            return;
        }

        setLoading(true)    

        try{
            const response = await createEmployee({
                name,
                cpf,
                birthDate: birthDate.format("YYYY/MM/DD"),
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
    return {
        name, setName,
        cpf, setCPF,
        birthDate, setBirthDate,
        email, setEmail,
        phone, setPhone,
        role, setRole,
        fetchEmployee,
        loading
    };
}

export default useEmployee;
