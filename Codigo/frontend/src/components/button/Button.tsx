import { StyledAntButton } from "./styles";

interface SearchButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Button = ({
  onClick,
  children,
  disabled,
  icon
}: SearchButtonProps) => {
  return (
    <>
      <StyledAntButton onClick={onClick} disabled={disabled}>
        {icon}
        {children}
      </StyledAntButton>
    </>
  );
};

export default Button;
