import { Menu, Modal } from "antd";

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

const path = {
  "1": "/events",
  "2": "/employees",
};

const onMenuClick = (e: any) => {
  if (e.key === "1") window.location.href = path["1"];
  if (e.key === "2") window.location.href = path["2"];
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

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SiderStyle
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        backgroundColor: "#050521",
      }}
      breakpoint="lg"
    >
    <div className="logo">
      <a href="/events">
        <img src={logoServin} alt="Logo Servin" />
      </a>
    </div>

      <Menu
        theme="dark"
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
