import styled from "styled-components";

export const HeaderContainer = styled.div`
  background-color: #050521;
  padding: 20px 5%; /* Adicionei 5% aqui para alinhar com a logo */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza as linhas horizontalmente */
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
  margin: 0 auto 20px auto; /* Centraliza a barra e aumenta o espaço inferior */
  padding: 0 20px; /* Evita que o conteúdo cole nas bordas em telas menores */

  .logo {
    display: flex;
    align-items: center;

    img {
      width: 140px; /* Aumentei de 100px para 140px para dar mais presença */
      height: auto;
      object-fit: contain;
    }
  }

  .user-menu {
    display: flex;
    gap: 25px; /* Aumentei um pouco o espaçamento entre os itens */
    align-items: center;
    font-size: 0.95rem;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8; /* Feedback visual ao passar o mouse */
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
