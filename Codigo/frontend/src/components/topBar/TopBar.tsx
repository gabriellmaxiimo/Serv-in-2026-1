import {Button} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import { logoServin } from "../../assets";
import { useLocation } from "react-router-dom";

const TopBar = () => {

    const location = useLocation();

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
                <span>Olá, Usuario</span> {/* TODO: Aqui no caso tem que ver como vai ser deixado aparecendo pro usuario o nome dele*/}

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