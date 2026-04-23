
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openErrorNotification } from "../../components/errorNotification";
import { openSuccessNotification } from "../../components/successNotification";
import { firstAccess } from "../../services/auth/integration";

const useFirstAccess = () => {
    const [cpfFA, setCpfFA] = useState("");
    const [passwordFA, setPasswordFA] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const fetchFirstAccess = async () => {
        setLoading(true);
        try {
            const response = await firstAccess({ cpf: cpfFA, password: passwordFA });
    
            if (response) {
                const token = response.data.token;
                    
                localStorage.setItem("token", token);
                    
                openSuccessNotification("Bem-vindo!");
                navigate("/events");
            }
    
        } catch (error) {
            const axiosError = error as any;
            const status = axiosError.response?.status;
            const errorMessage = axiosError.response?.data?.message || "Erro interno";

            if (status === 401) {
                openErrorNotification("Credenciais inválidas.");
            } else if (status === 400) {
                openErrorNotification("CPF inválido");
            } else {
                openErrorNotification("Erro ao acessar pela primeira vez.", errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };
    
    return { cpfFA, setCpfFA, passwordFA, setPasswordFA, fetchFirstAccess, loading };
};
    
export default useFirstAccess;
