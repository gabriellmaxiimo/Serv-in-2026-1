import { Menu, Modal } from "antd";
import {useNavigate} from "react-router-dom";

import {
  LogoutOutlined,
  ExclamationCircleFilled,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { SiderStyle } from "./style";
import { logoServin } from "../../assets";

const items = [
  { key: "1", icon: <EnvironmentOutlined />, label: "Eventos" },
  { key: "2", icon: <TeamOutlined />, label: "Funcionários" },
  {
    key: "6",
    icon: <LogoutOutlined />,
    label: "Sair",
  },
];

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const onMenuClick = (e: any) => {
    if (e.key === "1") navigate("/events");
    if (e.key === "2") navigate("/employees");
    if (e.key === "3") navigate("/professionals");
    if (e.key === "4") navigate("/metrics");
    if (e.key === "6") {
      return Modal.confirm({
        title: "Tem certeza que deseja sair?",
        icon: <ExclamationCircleFilled style={{ color: "red" }} />,
        content: "Você será redirecionado para a página de login.",
        okText: "Sim",
        okType: "danger",
        cancelText: "Não",
        onOk() {
          localStorage.removeItem("token");
          window.location.href = "/login";
        },
        style: {
          color: "#050521",
        },
      });
    }
  };

  return (
    <SiderStyle
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        backgroundColor: "var(--primary)",
      }}
      breakpoint="lg"
    >
    <div className="logo">
      <a href="/events">
        <img src={logoServin} alt="Logo Servin" />
      </a>
    </div>

      <Menu
        mode="inline"
        style={{
          marginTop: 20,
        }}
        items={items}
        onClick={onMenuClick}
        selectedKeys={[
          window.location.pathname === "/events"
            ? "1"
            : window.location.pathname === "/employees"
              ? "2"
              : window.location.pathname === "/history"
                ? "3"
                : window.location.pathname === "/profile"
                  ? "4"
                  : window.location.pathname === "/settings"
                    ? "5"
                    : "",
        ]}
      />
    </SiderStyle>
  );
};

export default SideBar;
