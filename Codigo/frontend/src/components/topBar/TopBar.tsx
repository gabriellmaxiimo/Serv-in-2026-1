import {Button} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import { logoServin } from "../../assets";
import { useLocation } from "react-router-dom";

const getFirstName = (): string => {
    const token = localStorage.getItem("token");
    if(!token) return "Usuário";

    try{
        const payload = JSON.parse(atob(token.split(".")[1]));
        const fullName: string = payload.name || "Usuário";
        return fullName.trim().split(" ")[0] || "Usuário";
    }catch{
        return "Usuário";
    }
};

const TopBar = () => {

    const location = useLocation();
    const firstName = getFirstName();

    const hideOnRoutes = ["/login", "/first-access", "/invites"];

    if (hideOnRoutes.some((route) => location.pathname.startsWith(route))) {
        return null;
    }

    return (
        <div style={{
            height: 70,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            borderBottom: "1px solid #e5e7eb",
            gap: 20,
        }}
        >
            <div style={{display: "flex", alignItems: "center"}}>
                <img
                    src={logoServin}
                    alt="Logo Servin"
                    style={{
                        height: 150,
                        objectFit: "contain",
                    }}
                />
            </div>

            <div style={{display: "flex", alignItems: "center", gap: 35}}>
                <span>Olá, {firstName}</span>

                <Button
                    type="primary"
                    icon={<LogoutOutlined/>}
                    style={{
                        background: "var(--secondary)",
                        border: "none",
                        borderRadius: 8,
                        right: 10,
                    }}
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                >
                    Sair
                </Button>
            </div>
        </div>
    );
};

export default TopBar;