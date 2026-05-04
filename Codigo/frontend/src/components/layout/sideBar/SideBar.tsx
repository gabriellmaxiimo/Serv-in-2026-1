import { Menu, Modal } from "antd";
import {useNavigate, useLocation } from "react-router-dom";

import {
  LogoutOutlined,
  ExclamationCircleFilled,
  EnvironmentOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { SiderStyle } from "./style";
import { logoServin, servinIcon } from "../../../assets";

const items = [
  { key: "1", icon: <EnvironmentOutlined />, label: "Eventos" },
  { key: "2", icon: <TeamOutlined />, label: "Funcionários" },
  { key: "3", icon: <UserSwitchOutlined />, label: "Profissionais" },
  { key: "4", icon: <BarChartOutlined />, label: "Métricas" },
  {
    key: "6",
    icon: <LogoutOutlined />,
    label: "Sair",
  },
];

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/events":
        return "1";
      case "/employees":
        return "2";
      case "/professionals":
        return "3";
      case "/metrics":
        return "4";
      default:
        return "";
    }
  };

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
        <img src={servinIcon} alt="Logo Servin" />
      </a>
    </div>

      <Menu
        mode="inline"
        style={{
          marginTop: 20,
        }}
        items={items}
        onClick={onMenuClick}
        selectedKeys={[getSelectedKey()]}
      />
    </SiderStyle>
  );
};

export default SideBar;
