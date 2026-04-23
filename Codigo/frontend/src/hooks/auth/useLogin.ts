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
            if((error as any).response?.status === 401) {
                openErrorNotification("Credenciais inválidas. Por favor, tente novamente.");
            }

            console.error("Erro ao fazer login:", error);

        } finally {
            setLoading(false);
        }
    };

    return { cpf, setCpf, password, setPassword, fetchLogin, loading };
};

export default useLogin;