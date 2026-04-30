import { useState } from "react"
import { login } from "../../services/auth/integration";
import { useNavigate } from "react-router-dom";
import { openSuccessNotification } from "../../components/successNotification";
import { openErrorNotification } from "../../components/errorNotification";

const useLogin = () => {
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const fetchLogin = async () => {
        setLoading(true);
        try {
            const response = await login({ cpf, password });

            if (response) {
                const token = response.data.token;
                
                localStorage.setItem("token", token);
                
                openSuccessNotification("Bem-vindo!");
                navigate("/events");
            }

        } catch (error) {

            if ((error as any).response?.status === 403) {
            openErrorNotification(
                "Primeiro Acesso Necessário", 
                "Sua conta foi encontrada, mas você ainda não possui uma senha. Clique em 'Primeiro Acesso' para configurar."
            );
        } else {
            openErrorNotification("Erro ao entrar", error instanceof Error ? error.message : "Tente novamente mais tarde.");
        }

        } finally {
            setLoading(false);
        }
    };

    return { cpf, setCpf, password, setPassword, fetchLogin, loading };
};

export default useLogin;