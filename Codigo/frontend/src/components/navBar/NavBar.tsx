import {useNavigate, useLocation} from "react-router-dom";
import{
    CalendarOutlined,
    TeamOutlined,
    IdcardOutlined,
    BarChartOutlined,
} from "@ant-design/icons";

const NavBar =() => {
    const navigate = useNavigate();
    const location = useLocation();

    const hideOnRoutes = ["/login", "/first-access", "/invites"];

    if (hideOnRoutes.some((route) => location.pathname.startsWith(route))) {
        return null;
    }

    const items = [
        {
            label: "Eventos",
            path:"/events",
            icon: <CalendarOutlined/>,
        },
        {
            label: "Funcionários",
            path: "/employees",
            icon: <TeamOutlined/>,
        },
        {
            label: "Profissionais",
            path: "/professionals",
            icon: <IdcardOutlined />,
        },
        {
            label: "Métricas",
            path: "/metrics",
            icon: <BarChartOutlined />,
        },
    ];

    return (
        <div
            style={{
                background: "var(--primary)",
                display: "flex",
                justifyContent: "center",
                gap: 50,
                padding: "14px 0",
            }}
        >
            {items.map((item) => {
                const active = location.pathname === item.path;

                return (
                    <div
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        style={{
                            cursor: "pointer",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontWeight: active ? 600 : 400,
                            borderBottom: active
                                ? "3px solid var(--secondary)"
                                : "3px solid transparent",
                            paddingBottom: 6,
                            transition: "0,2s",
                        }}
                    >
                        {item.icon}
                        {item.label}
                    </div>
                );
            })}
        </div>
    );
};

export default NavBar;