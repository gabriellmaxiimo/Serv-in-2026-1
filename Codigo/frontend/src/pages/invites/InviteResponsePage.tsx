import { useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, Card, Space, Typography, message } from "antd";
import api from "../../services/api";

const { Title, Paragraph, Text } = Typography;

const InviteResponsePage = () => {
  const { token } = useParams();
  const [loadingAction, setLoadingAction] = useState<"confirm" | "reject" | null>(null);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);

  const handleAction = async (action: "confirm" | "reject") => {
    if (!token) {
      message.error("Token do convite não encontrado.");
      return;
    }

    setLoadingAction(action);

    try {
      await api.patch(`/event-professionals/${action}/${token}`);
      const successMessage = action === "confirm"
        ? "Presença confirmada com sucesso."
        : "Convite recusado com sucesso.";

      setDoneMessage(successMessage);
      message.success(successMessage);
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data ||
        "Não foi possível processar sua resposta.";

      message.error(errorMessage);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "linear-gradient(180deg, #f3f7ff 0%, #ffffff 100%)" }}>
      <Card style={{ width: "100%", maxWidth: 680, borderRadius: 20, boxShadow: "0 20px 60px rgba(15, 60, 136, 0.12)" }}>
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          <div>
            <Title level={2} style={{ marginBottom: 8 }}>Convite de evento</Title>
            <Paragraph style={{ marginBottom: 0 }}>
              Você recebeu um convite para participar de um evento no sistema Servin.
            </Paragraph>
          </div>

          {doneMessage && <Alert type="success" showIcon message={doneMessage} />}

          <div>
            <Text strong>Token do convite:</Text>
            <Paragraph copyable style={{ marginTop: 4, wordBreak: "break-all" }}>
              {token || "Token não informado"}
            </Paragraph>
          </div>

          <Paragraph>
            Use os botões abaixo para confirmar ou recusar sua presença. Essa tela foi criada como ponto de acesso do convite enviado por e-mail.
          </Paragraph>

          <Space wrap>
            <Button
              type="primary"
              size="large"
              loading={loadingAction === "confirm"}
              disabled={!token || Boolean(doneMessage)}
              onClick={() => handleAction("confirm")}
            >
              Confirmar presença
            </Button>

            <Button
              danger
              size="large"
              loading={loadingAction === "reject"}
              disabled={!token || Boolean(doneMessage)}
              onClick={() => handleAction("reject")}
            >
              Recusar presença
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default InviteResponsePage;