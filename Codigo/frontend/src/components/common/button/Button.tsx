import { Button } from "antd";

interface SearchButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  htmlType?: "button" | "submit" | "reset";
  type?: "primary" | "default" | "dashed" | "text" | "link";
  size?: "small" | "middle" | "large";
}

const CustomButton = ({ onClick, children, disabled, icon, style, htmlType, type, size }: SearchButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      icon={icon}
      style={style}
      htmlType={htmlType}
      size={size}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
