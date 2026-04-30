import Sider from "antd/es/layout/Sider";
import styled from "styled-components";

export const ExitStyle = styled.div`
  focus {
    outline: none;
  }
`;

export const RedButton = styled.div`
  color: #ffffff;

  &:hover {
    background-color: #ff4d4f;
  }
`;

export const SiderStyle = styled(Sider)`
  background-color: #001529 !important;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);

  .ant-menu {
    background-color: #001529 !important;
    color: #001529
  }

  .ant-menu-item[data-menu-id*="6"] {
    color: white !important;
    margin-top: 20px !important;
    transition: all 0.3s ease !important;

    &:hover {
      background-color: #b32424 !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .ant-menu-title-content,
    .anticon {
      color: white !important;
    }
  }

  .ant-menu-item:not([data-menu-id*="6"]) {
    &:hover {
      background-color: #333333 !important;
    }

    background-color: transparent !important;
    color: #ffffff !important;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px;
  }

  .logo img {
    width: 90%;
    max-width: 200px;
    height: auto;
  }
`;
