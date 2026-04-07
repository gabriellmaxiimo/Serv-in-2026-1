import { TotalizerContainer, TotalLabel, TotalNumber } from "./styles";

interface TotalizerProps {
    total: number;
    description?: string;
}

const Totalizer: React.FC<TotalizerProps> = ({ total, description }) => {
  return (
    <TotalizerContainer>
      <TotalNumber>{total}</TotalNumber>
      <TotalLabel>{description}</TotalLabel>
    </TotalizerContainer>
  );
};

export default Totalizer;