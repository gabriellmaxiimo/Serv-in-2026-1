
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openErrorNotification } from "../../components/errorNotification";
import { openSuccessNotification } from "../../components/successNotification";
import { firstAccess } from "../../services/auth/integration";
import axios from "axios";

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
            
            const messageFromServer = axiosError.response?.data?.message;

            if (axiosError.response?.status === 400) {
                openErrorNotification("Erro na validação.");
            } else if (axiosError.response?.status === 404) {
                openErrorNotification("Não encontrado", messageFromServer || "Funcionário não existe.");
            } else {
                openErrorNotification("Erro no sistema", "Tente novamente mais tarde.");
            }
        } finally {
                setLoading(false);
        }
    };
    
    return { cpfFA, setCpfFA, passwordFA, setPasswordFA, fetchFirstAccess, loading };
};
    
export default useFirstAccess;
