import { FloatButton, Modal } from "antd";
import { supportIcon } from "../../assets";

const SupportButton = () => {
  return (
    <FloatButton
      icon={<img src={supportIcon} alt="Support Icon" />}
      tooltip="Suporte"
      onClick={() =>
        Modal.info({
          title: "Entre em contato com nosso suporte",
          content:
            "Suporte disponível de segunda a sexta, das 9h às 18h. Telefone: (11) 1234-5678 | Email: suporte@servin.com",
          style: {
            color: "#050521",
          },
        })
      }
    />
  );
};

export default SupportButton;
