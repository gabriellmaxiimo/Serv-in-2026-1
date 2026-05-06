import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { listAllEvents } from "../../services/events/integration";
import { listEventProfessionals, removeProfessional } from "../../services/eventProfessional/integration";
import type { EventProfessionalDTO } from "../../types/EventProfessionalDTO";
import { Table, Tag, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getProfessionalById } from "../../services/professional/integration";
import type { ProfessionalDTO } from "../../types/ProfessionalDTO";
import { openSuccessNotification } from "../../components/successNotification";
import { openErrorNotification } from "../../components/errorNotification";

type EventDetailsNavigationState = {
  from?: "event-list" | "professional-detail";
  event?: any;
  professionalId?: string;
};

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as EventDetailsNavigationState | null) ?? null;
  const [eventFromApi, setEventFromApi] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingProfessionals, setLoadingProfessionals] = useState(false);
  const [professionalsTableData, setProfessionalsTableData] = useState<any[]>([]);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

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

  const formatArea = (a?: string | null) => {
    if (!a) return "-";
    const trimmed = String(a).trim().toUpperCase();
    return areaTranslationMap[trimmed] || "-";
  };

  const eventFromState = useMemo(() => {
    if (!locationState) return null;
    if (locationState.event) return locationState.event;
    if (typeof locationState === "object" && "id" in locationState) return locationState;
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
              const profResp = await getProfessionalById(String(lp.professionalId));
              const profData: ProfessionalDTO = (profResp && (profResp.data ?? profResp)) as ProfessionalDTO;
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
          })
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
    if (locationState?.from === "professional-detail" && locationState.professionalId) {
      navigate(`/professional/${locationState.professionalId}`, {
        state: { from: "event-detail", eventId: id },
      });
      return;
    }

    navigate("/events");
  };

  const handleRemoveProfessional = async (professionalId: string, professionalName: string) => {
    if (!id) return;

    setRemovingIds((prev) => new Set(prev).add(professionalId));
    try {
      await removeProfessional(id, professionalId);
      openSuccessNotification(`${professionalName} removido do evento com sucesso!`);
      
      // Atualizar a lista de profissionais
      setProfessionalsTableData((prev) =>
        prev.filter((p) => p.id !== professionalId)
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

  const handleAddProfessional = () => {
    if (!id) return;
    navigate(`/professional`, {
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

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Detalhes do Evento</h1>
        <button
          type="button"
          onClick={handleBack}
          style={{
            border: "1px solid #d9d9d9",
            background: "#fff",
            borderRadius: 8,
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Voltar
        </button>
      </div>

      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt="Evento"
          style={{
            width: "100%",
            maxHeight: 300,
            objectFit: "cover",
            marginBottom: 20,
            borderRadius: 12,
          }}
        />
      )}

      <p><strong>Nome:</strong> {event.name}</p>
      <p><strong>Descrição:</strong> {event.description}</p>
      <p><strong>Data Inicial:</strong> {event.initialDate}</p>
      <p><strong>Data Final:</strong> {event.finalDate}</p>
      <p><strong>Localização:</strong> {event.location}</p>
      <p><strong>Status:</strong> {event.status}</p>

      <div style={{ marginTop: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Profissionais vinculados</h2>
          <Button type="primary" onClick={handleAddProfessional}>
            Adicionar profissional
          </Button>
        </div>

        {loadingProfessionals && <p>Carregando profissionais...</p>}

        {!loadingProfessionals && professionalsTableData.length === 0 && (
          <p>Nenhum profissional vinculado a este evento.</p>
        )}

        {!loadingProfessionals && professionalsTableData.length > 0 && (
          <Table
            dataSource={professionalsTableData}
            pagination={false}
            rowKey={(record) => String(record.key)}
            onRow={(record) => {
              return {
                onClick: () =>
                  navigate(`/professional/${record.id}`, {
                    state: { from: "event-detail", eventId: id },
                  }),
              } as any;
            }}
            columns={[
              {
                title: "NOME",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "CPF",
                dataIndex: "cpf",
                key: "cpf",
                render: (v: string) => v || "-",
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
                  const label = statusLabelMap[s];
                  const color = s === "CONFIRMED" ? "green" : s === "REJECTED" ? "red" : "orange";
                  return <Tag color={color}>{label}</Tag>;
                },
              },
              {
                title: "AÇÕES",
                dataIndex: "actions",
                key: "actions",
                render: (_: any, record: any) => (
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
                      type="primary"
                      danger
                      size="small"
                      loading={removingIds.has(record.id)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Remover
                    </Button>
                  </Popconfirm>
                ),
              },
            ] as ColumnsType<any>}
          />
        )}
      </div>
    </div>
  );
};

export default EventDetailsPage;