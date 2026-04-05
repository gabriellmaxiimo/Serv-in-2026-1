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
  background-color: #050521 !important;

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
      background-color: #2c74f8 !important;
    }
  }
`;
