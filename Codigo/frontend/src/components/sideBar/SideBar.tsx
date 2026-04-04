import { Menu, Modal } from "antd";

import {
  LogoutOutlined,
  ExclamationCircleFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { SiderStyle } from "./style";
import { TopBar } from "../header/styles";
import { logoServin } from "../../assets";

const items = [
  { key: "1", icon: <EnvironmentOutlined />, label: "Eventos" },
  {
    key: "6",
    icon: <LogoutOutlined />,
    label: "Sair",
  },
];

const path = {
  "1": "/events",
};

const onMenuClick = (e: any) => {
  if (e.key === "1") window.location.href = path["1"];
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
      <TopBar>
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {!collapsed ? (
            <a href="/events">
              <img
                src={logoServin}
                alt="Logo GMS"
                style={{ height: "auto", objectFit: "contain" }}
              />
            </a>
          ) : (
            <img
              src={logoServin}
              alt="Logo GMS"
              style={{
                height: "auto",
                objectFit: "contain",
              }}
              hidden={true}
            />
          )}
        </div>
      </TopBar>

      <Menu
        theme="dark"
        mode="inline"
        style={{
          backgroundColor: "#050521",
          position: "absolute",
          top: 200,
          bottom: 0,
          width: "100%",
        }}
        items={items}
        onClick={onMenuClick}
        selectedKeys={[
          window.location.pathname === "/flights"
            ? "1"
            : window.location.pathname === "/my-purchases"
              ? "2"
              : window.location.pathname === "/history"
                ? "3"
                : window.location.pathname === "/profile"
                  ? "4"
                  : window.location.pathname === "/settings"
                    ? "5"
                    : "1",
        ]}
      />
    </SiderStyle>
  );
};

export default SideBar;
