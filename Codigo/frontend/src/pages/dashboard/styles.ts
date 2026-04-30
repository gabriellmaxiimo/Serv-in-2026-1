import styled from "styled-components";

export const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #dfdfdf;
    padding: 20px;
    margin: 20px;
    height: 100%;
    border-radius: 8px;
`

export const TotalizersContainer = styled.div`
    display: flex;
    width: 100%;
`

export const ChartsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; /* Correção: era 'wrap' e o correto é 'flex-wrap' */
    width: 100%;
    gap: 20px;
    justify-content: space-between; 
`