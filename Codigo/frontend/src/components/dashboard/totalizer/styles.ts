import styled from "styled-components";

export const TotalizerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #d9d9d9;
  height: 150px;
  margin: 0 auto 20px auto;
  width: 200px;
`;

export const TotalNumber = styled.h1`
  font-size: 53px;
  color: #2e5339;
  margin: 0;
`;

export const TotalLabel = styled.span`
  color: #595959;
  font-size: 14px;
`;