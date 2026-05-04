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
  background: linear-gradient(180deg, #1d4ed8, #0f172a);
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.15);

  .ant-menu {
    background: transparent !important;
    border-right: none !important;
  }

  .ant-menu-item {
    color: #fff !important;
    margin: 6px 10px;
    padding: 10px 12px;
    border-radius: 12px;
    transition: all 0.25s ease;
    height: 45px;
    line-height: 45px;

    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .ant-menu-item-selected{
    background: rgba(255, 255, 255, 0.15);
    font-weight: 600;
    cursor: pointer;
  }
  
  .ant-menu-item:hover{
    background: rgba(255, 255, 255, 0.08) !important;
  }

  .ant-menu .ant-menu-item[data-menu-id*="6"]{
    color: #fff !important;
  }

  .ant-menu .ant-menu-item[data-menu-id*="6"]:hover{
    background: rgba(239, 68, 68, 0.2) !important;
  }

  .ant-menu .ant-menu-item[data-menu-id*="6"]:hover .ant-menu-title-content, .ant-menu .ant-menu-item[data-menu-id*="6"]:hover .action{
    color: #ef4444 !important;
  }

  .logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 10px;
  }

  .logo img {
    width: 80%;
    background: transparent; /* tenta garantir */
    max-width: 160px;
    filter: brightness(0) invert(1);
  }
`;
