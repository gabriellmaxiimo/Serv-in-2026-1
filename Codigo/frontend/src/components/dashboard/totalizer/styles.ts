import styled from "styled-components";

export const TotalizerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border);
  height: 150px;
  margin: 0 40px;
  width: 200px;
`;

export const TotalNumber = styled.h1`
  font-size: 53px;
  color: var(--primary);
  margin: 0;
`;

export const TotalLabel = styled.span`
  color: var(--text-secondary);
  font-size: 14px;
`;