import styled from "styled-components";
import Button from "../../components/button/Button";

export const LoginPageBackground = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #cfcfcf;
`;

export const ImageSection = styled.div`
    flex: 1;
    height: 100%;
    display: block;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: 768px) {
        display: none; /* Esconde a imagem em telas muito pequenas */
    }
`;

export const FormSection = styled.div`
    width: 450px;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #cfcfcf;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const LoginCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 350px;
    padding: 40px;
`;

export const CustomButtonStyle = styled(Button)`
    background-color: #181880;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin-top: 15px;

    &:hover {
        background-color: #2a2a9e;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    margin-top: 20px;
`;