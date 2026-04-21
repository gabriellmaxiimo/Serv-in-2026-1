import { Button } from "antd";

interface SearchButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const CustomButton = ({ onClick, children, disabled, icon }: SearchButtonProps) => {
  return (
    <Button
      type="primary"
      onClick={onClick}
      disabled={disabled}
      icon={icon}
      style={{ height: 45, fontWeight: "bold" }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
