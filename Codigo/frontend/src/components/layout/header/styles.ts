import styled from "styled-components";

export const HeaderContainer = styled.div`
  background-color: #001529;
  padding: 20px 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  color: white;
  margin: 0 auto 20px auto;
  padding: 0 20px;

  .logo {
    display: flex;
    align-items: center;

    img {
      width: 140px;
      height: auto;
      object-fit: contain;
    }
  }

  .user-menu {
    display: flex;
    gap: 25px;
    align-items: center;
    font-size: 0.95rem;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;

  & > div,
  & > input,
  & > .ant-select {
    width: 100% !important;
    height: 100%;
  }

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    height: auto;
  }
`;
