import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { listAllEvents } from "../../services/events/integration";
import {
  listEventProfessionals,
  removeProfessional,
} from "../../services/eventProfessional/integration";
import type { EventProfessionalDTO } from "../../types/EventProfessionalDTO";
import {
  Row,
  Col,
  Card,
  Table,
  Tag,
  Button,
  Popconfirm,
  Modal,
  Input,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { getProfessionalById } from "../../services/professional/integration";
import type { ProfessionalDTO } from "../../types/ProfessionalDTO";
import { openSuccessNotification } from "../../components/successNotification";
import { openErrorNotification } from "../../components/errorNotification";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { isAdmin } from "../../functions/userIsAdmin";

type EventDetailsNavigationState = {
  from?: "event-list" | "professional-detail";
  event?: any;
  professionalId?: string;
};

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState =
    (location.state as EventDetailsNavigationState | null) ?? null;
  const [eventFromApi, setEventFromApi] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingProfessionals, setLoadingProfessionals] = useState(false);
  const [professionalsTableData, setProfessionalsTableData] = useState<any[]>(
    [],
  );
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [credentialNumber, setCredentialNumber] = useState("");

  const isAdminUser = isAdmin();

  const areaTranslationMap: Record<string, string> = {
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

  const formatDateTime = (date?: string | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatArea = (a?: string | null) => {
    if (!a) return "-";
    const trimmed = String(a).trim().toUpperCase();
    return areaTranslationMap[trimmed] || "-";
  };

  const eventFromState = useMemo(() => {
    if (!locationState) return null;
    if (locationState.event) return locationState.event;
    if (typeof locationState === "object" && "id" in locationState)
      return locationState;
    return null;
  }, [locationState]);

  useEffect(() => {
    const loadEventById = async () => {
      if (eventFromState || !id) return;

      setLoading(true);
      try {
        const events = await listAllEvents();
        const foundEvent = Array.isArray(events)
          ? events.find((item: any) => String(item.id) === String(id))
          : null;
        setEventFromApi(foundEvent || null);
      } catch {
        setEventFromApi(null);
      } finally {
        setLoading(false);
      }
    };

    loadEventById();
  }, [id, eventFromState]);

  useEffect(() => {
    const loadLinkedProfessionals = async () => {
      if (!id) {
        setProfessionalsTableData([]);
        return;
      }

      setLoadingProfessionals(true);
      try {
        const response = await listEventProfessionals(id);
        const list = Array.isArray(response.data) ? response.data : [];

        // Enriquecer cada vinculo com dados do profissional quando possível
        const enriched = await Promise.all(
          list.map(async (lp: EventProfessionalDTO) => {
            try {
              const profResp = await getProfessionalById(
                String(lp.professionalId),
              );
              const profData: ProfessionalDTO = (profResp &&
                (profResp.data ?? profResp)) as ProfessionalDTO;
              return {
                key: lp.id ?? `${lp.professionalId}`,
                id: lp.professionalId,
                name: profData?.name || lp.professionalName,
                cpf: profData?.cpf || "",
                role: profData?.role?.name || "-",
                area: formatArea(profData?.area || (lp as any).area),
                status: lp.status,
              };
            } catch {
              return {
                key: lp.id ?? `${lp.professionalId}`,
                id: lp.professionalId,
                name: lp.professionalName,
                cpf: "",
                role: "-",
                area: formatArea((lp as any).area),
                status: lp.status,
              };
            }
          }),
        );

        setProfessionalsTableData(enriched);
      } catch {
        setProfessionalsTableData([]);
      } finally {
        setLoadingProfessionals(false);
      }
    };

    loadLinkedProfessionals();
  }, [id]);

  const event = useMemo(() => {
    return eventFromState || eventFromApi;
  }, [eventFromState, eventFromApi]);

  const handleBack = () => {
    if (
      locationState?.from === "professional-detail" &&
      locationState.professionalId
    ) {
      navigate(`/professional/${locationState.professionalId}`, {
        state: { from: "event-detail", eventId: id },
      });
      return;
    }

    navigate("/events");
  };

  const handleRemoveProfessional = async (
    professionalId: string,
    professionalName: string,
  ) => {
    if (!id) return;

    setRemovingIds((prev) => new Set(prev).add(professionalId));
    try {
      await removeProfessional(id, professionalId);
      openSuccessNotification(
        `${professionalName} removido do evento com sucesso!`,
      );

      // Atualizar a lista de profissionais
      setProfessionalsTableData((prev) =>
        prev.filter((p) => p.id !== professionalId),
      );
    } catch (error) {
      openErrorNotification("Erro ao remover profissional do evento");
    } finally {
      setRemovingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(professionalId);
        return newSet;
      });
    }
  };

  const handleOpenCredentialModal = (professional: any) => {
    setSelectedProfessional(professional);
    setCredentialNumber("");
    setIsCredentialModalOpen(true);
  };

  const handleAddProfessional = () => {
    if (!id) return;
    navigate(`/professionals`, {
      state: { from: "event-details", eventId: id },
    });
  };

  const statusLabelMap: Record<EventProfessionalDTO["status"], string> = {
    PENDING_CONFIRMATION: "Pendente",
    CONFIRMED: "Confirmado",
    REJECTED: "Recusado",
    CANCELED: "Cancelado",
  };

  if (loading) return <p>Carregando evento...</p>;

  if (!event) return <p>Evento não encontrado</p>;

  const locationString = `${event.street}, ${event.neighborhood} - ${event.city} / ${event.state}`;

  return (
    <div style={{ padding: 24, background: "#f5f7fb", minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Button onClick={handleBack}>← Voltar</Button>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>
                {event.name}
              </h2>

              <Tag color={event.status === "ACTIVE" ? "green" : "orange"}>
                {event.status}
              </Tag>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {isAdminUser && (
            <>
              <Button icon={<EditOutlined />}>Editar Evento</Button>
              <Button danger>Cancelar Evento</Button>
            </>
          )}
        </div>
      </div>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {/* COLUNA ESQUERDA (MAIOR) */}
        <Col xs={24} md={16}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ marginBottom: 6 }}>Sobre o Evento</h3>
              <p style={{ color: "#666" }}>{event.description}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ marginBottom: 6 }}>Datas e Horários</h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  color: "#555",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CalendarOutlined />
                  <span>Início: {formatDateTime(event.initialDate)}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CalendarOutlined />
                  <span>Fim: {formatDateTime(event.finalDate)}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <EnvironmentOutlined />
                <span>{locationString}</span>
              </div>
            </div>
          </Card>
        </Col>

        {/* COLUNA DIREITA */}
        <Col
          xs={24}
          md={8}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <h3>Organizador</h3>
            <p style={{ margin: 0, color: "#666" }}>
              Equipe de Eventos Corporativos
            </p>
          </Card>

          <Card bordered={false} style={{ borderRadius: 12 }}>
            <h3>Métricas</h3>
            <p style={{ margin: 0, color: "#666" }}>
              Total de Profissionais: {professionalsTableData.length}
            </p>
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 28 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0 }}>Profissionais vinculados</h2>

          {isAdminUser && (
            <Button type="primary" onClick={handleAddProfessional}>
              Adicionar profissional
            </Button>
          )}
        </div>

        {loadingProfessionals && <p>Carregando profissionais...</p>}

        {!loadingProfessionals && professionalsTableData.length === 0 && (
          <p>Nenhum profissional vinculado a este evento.</p>
        )}

        {!loadingProfessionals && professionalsTableData.length > 0 && (
          <Table
            size="middle"
            dataSource={professionalsTableData}
            pagination={false}
            rowKey={(record) => String(record.key)}
            rowClassName={() => "professional-row"}
            onRow={(record) => {
              return {
                onClick: () =>
                  navigate(`/professional/${record.id}`, {
                    state: { from: "event-detail", eventId: id },
                  }),
              } as any;
            }}
            columns={
              [
                {
                  title: "PROFISSIONAL",
                  dataIndex: "name",
                  render: (name: string, record: any) => (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: 600 }}>{name}</span>
                      <span style={{ fontSize: 12, color: "#888" }}>
                        {record.role} • {record.area}
                      </span>
                    </div>
                  ),
                },
                {
                  title: "CPF",
                  dataIndex: "cpf",
                  render: (v: string) => (
                    <span style={{ color: "#999", fontSize: 13 }}>
                      {v || "-"}
                    </span>
                  ),
                },
                {
                  title: "CARGO",
                  dataIndex: "role",
                  key: "role",
                  render: (v: string) => v || "-",
                },
                {
                  title: "ÁREA",
                  dataIndex: "area",
                  key: "area",
                  render: (v: string) => v || "-",
                },
                {
                  title: "STATUS DO CONVITE",
                  dataIndex: "status",
                  key: "status",
                  render: (s: EventProfessionalDTO["status"]) => {
                    const statusConfig: Record<
                      EventProfessionalDTO["status"],
                      { color: string }
                    > = {
                      PENDING_CONFIRMATION: { color: "orange" },
                      CONFIRMED: { color: "green" },
                      REJECTED: { color: "red" },
                      CANCELED: { color: "default" },
                    };
                    // const config = statusConfig[s];

                    return (
                      <Tag
                        style={{
                          borderRadius: 20,
                          padding: "2px 10px",
                          fontWeight: 500,
                        }}
                      // color={config.color}
                      >
                        {statusLabelMap[s]}
                      </Tag>
                    );
                  },
                },

                {
                  title: "AÇÕES",
                  dataIndex: "actions",
                  key: "actions",
                  render: (_: any, record: any) => (
                    <>
                      <Button
                        type="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCredentialModal(record);
                        }}
                        style={{
                          marginRight: 8,
                          borderRadius: 8,
                        }}
                      >
                        Credenciar
                      </Button>

                      <Popconfirm
                        title="Remover profissional"
                        description={`Tem certeza que deseja remover ${record.name} do evento?`}
                        onConfirm={(e) => {
                          e?.stopPropagation();
                          handleRemoveProfessional(record.id, record.name);
                        }}
                        onCancel={(e) => {
                          e?.stopPropagation();
                        }}
                        okText="Sim"
                        cancelText="Cancelar"
                      >
                        <Button
                          type="text"
                          danger
                          icon={<StopOutlined />}
                          loading={removingIds.has(record.id)}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            borderRadius: 8,
                          }}
                        >
                          Remover
                        </Button>
                      </Popconfirm>
                    </>
                  ),
                },
              ] as ColumnsType<any>
            }
          />
        )}
                   
      </div>

      <Modal
        title="Credenciar profissional"
        open={isCredentialModalOpen}
        onCancel={() => setIsCredentialModalOpen(false)}
        onOk={() => {}}
        okText="Realizar Check-in"
        cancelText="Cancelar"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 20,
          }}
        >
          <div>
            <strong>Profissional:</strong>{" "}
            {selectedProfessional?.name}
          </div>

          <Input
            placeholder="Número da pulseira"
            value={credentialNumber}
            onChange={(e) => setCredentialNumber(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default EventDetailsPage;