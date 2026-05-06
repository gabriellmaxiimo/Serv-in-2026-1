import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Empty,
  Layout,
  Skeleton,
  Tag,
  Typography,
} from "antd";
import { getProfessionalById, listProfessionalEvents } from "../../services/professional/integration";
import type { ProfessionalDTO } from "../../types/ProfessionalDTO";
import type { EventProfessionalDTO } from "../../types/EventProfessionalDTO";

const { Content } = Layout;
const { Title, Text } = Typography;

const areaLabelMap: Record<string, string> = {
  MEDICINE: "Medicina",
  SECURITY: "Segurança",
  FOOD_SERVICE: "Alimentação",
  BEVERAGES: "Bebidas",
  CLEANING: "Limpeza",
  LOGISTICS: "Logística",
  STAFF: "Staff",
  RECEPTION: "Recepção",
  TECHNOLOGY: "Tecnologia",
};

const statusLabelMap: Record<"AVAILABLE" | "INACTIVE", { label: string; color: string }> = {
  AVAILABLE: { label: "Disponível", color: "green" },
  INACTIVE: { label: "Inativo", color: "red" },
};

const eventStatusLabelMap: Record<EventProfessionalDTO["status"], { label: string; color: string }> = {
  PENDING_CONFIRMATION: { label: "Pendente", color: "gold" },
  CONFIRMED: { label: "Confirmado", color: "green" },
  REJECTED: { label: "Recusado", color: "red" },
  CANCELED: { label: "Cancelado", color: "default" },
};

const formatCpf = (cpf: string) =>
  cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

const formatPhone = (phone: string) =>
  phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

const infoItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: "12px 14px",
  border: "1px solid #f0f0f0",
  borderRadius: 8,
  background: "#fafafa",
};

const sectionStyle: React.CSSProperties = {
  marginTop: 20,
  padding: 20,
  border: "1px solid #f0f0f0",
  borderRadius: 12,
  background: "#fff",
};

const ProfessionalDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as { from?: string; eventId?: string } | null;

  const [professional, setProfessional] = useState<ProfessionalDTO | null>(null);
  const [events, setEvents] = useState<EventProfessionalDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessional = async () => {
      if (!id) {
        setError("ID do profissional não informado.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const [professionalData, eventsData] = await Promise.all([
          getProfessionalById(id),
          listProfessionalEvents(id),
        ]);

        setProfessional(professionalData as ProfessionalDTO);
        setEvents(Array.isArray(eventsData) ? (eventsData as EventProfessionalDTO[]) : []);
      } catch (err: any) {
        setError(err?.response?.data?.message || err?.response?.data || "Erro ao carregar profissional.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessional();
  }, [id]);

  const statusInfo = useMemo(() => {
    if (!professional) return null;
    return statusLabelMap[professional.status] || { label: professional.status, color: "default" };
  }, [professional]);

  const handleBack = () => {
    if (locationState?.from === "event-detail" && locationState.eventId) {
      navigate(`/events/${locationState.eventId}`, {
        state: { from: "professional-detail", professionalId: id },
      });
      return;
    }

    navigate("/professional");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: "#fff",
          borderRadius: 8,
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <Title level={4} style={{ margin: 0 }}>Detalhes do Profissional</Title>
          <Button onClick={handleBack}>Voltar</Button>
        </div>

        {loading && <Skeleton active paragraph={{ rows: 6 }} />}

        {!loading && error && (
          <Alert
            type="error"
            showIcon
            message="Não foi possível carregar o profissional"
            description={error}
          />
        )}

        {!loading && !error && professional && statusInfo && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
                padding: "18px 20px",
                borderRadius: 12,
                background: "linear-gradient(90deg, #f6ffed 0%, #ffffff 100%)",
                border: "1px solid #d9f7be",
              }}
            >
              <div>
                <Text type="secondary" style={{ display: "block", marginBottom: 2 }}>
                  Profissional
                </Text>
                <Title level={3} style={{ margin: 0 }}>
                  {professional.name}
                </Title>
                <Text type="secondary">CPF: {formatCpf(professional.cpf)}</Text>
              </div>
              <Tag color={statusInfo.color} style={{ fontSize: 14, padding: "6px 10px" }}>
                {statusInfo.label}
              </Tag>
            </div>

            <div style={sectionStyle}>
              <Title level={5} style={{ marginTop: 0 }}>Informações Pessoais</Title>
              <div
                style={{
                  display: "grid",
                  gap: 12,
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                }}
              >
                <div style={infoItemStyle}>
                  <Text type="secondary">Data de Nascimento</Text>
                  <Text>
                    {professional.birthDate
                      ? new Date(professional.birthDate).toLocaleDateString("pt-BR")
                      : "-"}
                  </Text>
                </div>
                <div style={infoItemStyle}>
                  <Text type="secondary">E-mail</Text>
                  <Text>{professional.email || "-"}</Text>
                </div>
                <div style={infoItemStyle}>
                  <Text type="secondary">Telefone</Text>
                  <Text>{professional.phone ? formatPhone(professional.phone) : "-"}</Text>
                </div>
              </div>
            </div>

            <div style={sectionStyle}>
              <Title level={5} style={{ marginTop: 0 }}>Informações Profissionais</Title>
              <div
                style={{
                  display: "grid",
                  gap: 12,
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                }}
              >
                <div style={infoItemStyle}>
                  <Text type="secondary">Cargo</Text>
                  <Text>{professional.role?.name || "-"}</Text>
                </div>
                <div style={infoItemStyle}>
                  <Text type="secondary">Área</Text>
                  <Text>{areaLabelMap[professional.area] || professional.area || "-"}</Text>
                </div>
              </div>
            </div>

            <div style={sectionStyle}>
              <Title level={5} style={{ marginTop: 0 }}>Eventos que já participou</Title>

              {events.length === 0 ? (
                <Empty description="Nenhum evento encontrado para este profissional" />
              ) : (
                <div
                  style={{
                    display: "grid",
                    gap: 12,
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  }}
                >
                  {events.map((eventItem) => {
                    const eventStatus = eventStatusLabelMap[eventItem.status];
                    return (
                      <div
                        key={eventItem.id}
                        onClick={() =>
                          navigate(`/events/${eventItem.eventId}`, {
                            state: { from: "professional-detail", professionalId: id },
                          })
                        }
                        style={{
                          border: "1px solid #f0f0f0",
                          borderRadius: 10,
                          padding: 14,
                          background: "#fafafa",
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f0f0f0";
                          e.currentTarget.style.borderColor = "#d9d9d9";
                          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#fafafa";
                          e.currentTarget.style.borderColor = "#f0f0f0";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <div style={{ marginBottom: 8 }}>
                          <Text strong style={{ fontSize: 14 }}>
                            {eventItem.eventName || "Evento sem nome"}
                          </Text>
                        </div>

                        <Tag color={eventStatus.color} style={{ width: "fit-content" }}>
                          {eventStatus.label}
                        </Tag>

                        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              📅 Convidado em:
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: 500 }}>
                              {new Date(eventItem.createdAt).toLocaleDateString("pt-BR")}
                            </Text>
                          </div>

                          {eventItem.confirmedAt && (
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <Text type="secondary" style={{ fontSize: 12 }}>
                                ✓ Confirmado em:
                              </Text>
                              <Text style={{ fontSize: 12, fontWeight: 500 }}>
                                {new Date(eventItem.confirmedAt).toLocaleDateString("pt-BR")}
                              </Text>
                            </div>
                          )}
                        </div>

                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #e8e8e8" }}>
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            Clique para ver detalhes completos →
                          </Text>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default ProfessionalDetailPage;