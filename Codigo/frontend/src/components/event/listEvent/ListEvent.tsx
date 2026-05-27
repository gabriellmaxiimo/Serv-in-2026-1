import { Empty, Pagination } from "antd";
import { useState } from "react";
import { Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Select,
  Table,
  type MenuProps,
} from "antd";
import useListEvent from "../../../hooks/event/useListEvent";
import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  MoreOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { isAdmin } from "../../../functions/userIsAdmin";

const ListEvent: React.FC = () => {
  const {
    events,
    loading,
    setFilterName,
    setFilterLocation,
    setFilterInitialDate,
    setFilterFinalDate,
    setFilterStatus,
    deleteEventById,
  } = useListEvent();

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { confirm } = Modal;

  const isAdminUser = isAdmin();

  const navigate = useNavigate();

  const statusOptions = [
    { label: "Agendado", value: "AGENDADO" },
    { label: "Andamento", value: "ANDAMENTO" },
    { label: "Finalizado", value: "FINALIZADO" },
  ];

  // TELA COM GRID EM LINHAS
  const columns = [
    {
      title: "Nome do Evento",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Localização",
      dataIndex: "street",
      key: "street",
      render: (street: string) => {
        return street ? street : "-";
      },
    },
    {
      title: "Data de Início",
      dataIndex: "initialDate",
      key: "initialDate",
      render: (date: any) =>
        date ? new Date(date).toLocaleString("pt-BR") : "-",
    },
    {
      title: "Data de Término",
      dataIndex: "finalDate",
      key: "finalDate",
      render: (date: any) =>
        date ? new Date(date).toLocaleString("pt-BR") : "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        if (!status) return "-";
        const statusLower = status.toLowerCase();
        const firstLetter =
          statusLower.charAt(0).toUpperCase() + statusLower.slice(1);

        let color = "default";
        if (firstLetter === "Andamento") color = "green";
        else if (firstLetter === "Agendado") color = "blue";
        else if (firstLetter === "Finalizado") color = "red";

        return <span style={{ color }}>{firstLetter}</span>;
      },
    },
    {
      title: "Ação",
      dataIndex: "actionButton",
      key: "actionButton",
      render: (_: any, record: any) => {
        const items: MenuProps["items"] = [
          {
            key: "view",
            label: "Visualizar",
            icon: <EyeFilled />,
            onClick: (e) => {
              e.domEvent.stopPropagation();
              setSelectedEvent(record);
              setIsModalOpen(true);
              navigate(`/events/${record.id}`);
            },
          },
          isAdminUser
            ? {
                key: "edit",
                label: "Editar",
                icon: <EditOutlined />,
                onClick: (e) => {
                  e.domEvent.stopPropagation();
                },
              }
            : null,

          isAdminUser
            ? {
                key: "delete",
                label: <span style={{ color: "red" }}>Deletar</span>,
                icon: <DeleteOutlined style={{ color: "red" }} />,
                onClick: (e) => {
                  e.domEvent.stopPropagation();
                  confirm({
                    title: "Você tem certeza que deseja excluir este evento?",
                    icon: <CloseCircleFilled />,
                    content: `O evento "${record.name}" será removido permanentemente.`,
                    okText: "Sim, excluir",
                    okType: "danger",
                    cancelText: "Não",
                    onOk() {
                      deleteEventById(record.id);
                    },
                  });
                },
              }
            : null,
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button
              type="text"
              icon={<MoreOutlined />}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        );
      },
    },
  ];

  const fieldStyle = {
    marginBottom: 10,
  };

  const [viewMode, setViewMode] = useState("grid");
  const [sortOrder, setSortOrder] = useState<
    "default" | "recent" | "old" | "az"
  >("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const safeEvents = Array.isArray(events) ? events : [];
  const totalItems = safeEvents.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const sortedEvents = [...safeEvents].sort((a, b) => {
    const dateA = a?.initialDate ? new Date(a.initialDate).getTime() : 0;
    const dateB = b?.initialDate ? new Date(b.initialDate).getTime() : 0;

    if (sortOrder === "recent") {
      return dateA - dateB; // mais próximos
    }

    if (sortOrder === "old") {
      return dateB - dateA; // mais distantes
    }

    if (sortOrder === "az") {
      return (a.name ?? "").localeCompare(b.name ?? ""); // ordem alfabética
    }

    if (sortOrder === "default") {
      return (a.id ?? 0) - (b.id ?? 0); // ordem de criação (se ID for incremental)
    }

    return 0; // 🔥 padrão (não altera ordem original)
  });

  const paginatedEvents = sortedEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <>
      <Row gutter={20} align="top">
        <Col xs={24} md={6} style={{ display: "flex" }}>
          <Card
            style={{
              borderRadius: 16,
              border: "1px solid #e57eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              width: "100%",

              position: "sticky",
              top: 20,

              height: "calc(100vh - 120px)",
              overflow: "auto",
            }}
            bodyStyle={{
              padding: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#1f2937",
                }}
              >
                Filtros
              </span>
            </div>

            <div style={fieldStyle}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>
                Nome do Evento
              </span>
              <Input
                placeholder="Buscar por nome..."
                style={{ borderRadius: 8, marginTop: 4 }}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>
                Localização
              </span>

              <Input
                placeholder="Selecione..."
                style={{ borderRadius: 8, marginTop: 4 }}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>Período</span>

              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <DatePicker
                  style={{ width: "100%", borderRadius: 8 }}
                  placeholder="Data Inicial"
                  onChange={(date) =>
                    setFilterInitialDate(
                      date ? date.toDate().toISOString() : null,
                    )
                  }
                  format="DD/MM/YYYY"
                />

                <DatePicker
                  style={{ width: "100%", borderRadius: 8 }}
                  placeholder="Data Final"
                  onChange={(date) =>
                    setFilterFinalDate(
                      date ? date.toDate().toISOString() : null,
                    )
                  }
                  format="DD/MM/YYYY"
                />
              </div>
            </div>

            <div style={fieldStyle}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>Status</span>

              <Select
                mode="multiple"
                allowClear
                placeholder="Todos os Status"
                style={{ width: "100%", marginTop: 4, borderRadius: 8 }}
                onChange={(value) => setFilterStatus(value)}
                options={statusOptions}
              />
            </div>

            <Button
              block
              style={{
                marginTop: 10,
                height: 40,
                borderRadius: 8,
                border: "1px solid #22c55e",
                color: "#22c55e",
                fontWeight: 500,
                background: "#f0fdf4",
              }}
            >
              Limpar Filtro
            </Button>
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div>
              <h2 style={{ marginBottom: 0 }}>Eventos</h2>
              <p style={{ color: "var(--text-light)", marginBottom: 0 }}>
                Gerencie e acompanhe todos os seus eventos.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Select
                value={sortOrder}
                placeholder="Ordenar por"
                size="middle"
                style={{
                  width: 220,
                }}
                dropdownStyle={{
                  borderRadius: 12,
                }}
                onChange={(value) => setSortOrder(value)}
                options={[
                  {
                    label: (
                      <span>
                        <CalendarOutlined /> Ordem padrão
                      </span>
                    ),
                    value: "default",
                  },
                  {
                    label: (
                      <span>
                        <SortAscendingOutlined /> Data mais próxima
                      </span>
                    ),
                    value: "recent",
                  },
                  {
                    label: (
                      <span>
                        <SortDescendingOutlined /> Data mais distante
                      </span>
                    ),
                    value: "old",
                  },
                  {
                    label: (
                      <span>
                        <FontSizeOutlined /> Nome (A–Z)
                      </span>
                    ),
                    value: "az",
                  },
                ]}
              />

              {/* TODO: Esses Button sao para fazer a setagem se a tela sera em Card ou em Lista*/}
              <Button
                icon={<AppstoreOutlined />}
                type={viewMode === "grid" ? "primary" : "default"}
                onClick={() => setViewMode("grid")}
              />
              <Button
                icon={<UnorderedListOutlined />}
                type={viewMode === "list" ? "primary" : "default"}
                onClick={() => setViewMode("list")}
              />

              {isAdminUser && (
                <Button
                  type="primary"
                  style={{
                    background: "#22c55e",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 500,
                  }}
                  onClick={() => navigate("/events/create")}
                >
                  + Criar Evento
                </Button>
              )}
            </div>
          </div>

          {
            // GRID VIEW
          }
          <div style={{ marginTop: 20 }}>
            {viewMode === "grid" ? (
              <Row gutter={[16, 16]}>
                {paginatedEvents?.map((event: any) => {
                  const location =
                    event.street +
                    ", " +
                    event.neighborhood +
                    " / " +
                    event.city;
                  const items: MenuProps["items"] = [
                    isAdminUser
                      ? {
                          key: "edit",
                          label: "Editar",
                          icon: <EditOutlined />,
                          onClick: () =>
                            console.log("Editar evento com ID:", event.id),
                        }
                      : null,

                    isAdminUser
                      ? {
                          key: "delete",
                          label: <span style={{ color: "red" }}>Deletar</span>,
                          icon: <DeleteOutlined style={{ color: "red" }} />,
                          onClick: () => {
                            confirm({
                              title:
                                "Você tem certeza que deseja excluir este evento?",
                              icon: <CloseCircleFilled />,
                              content: `O evento "${event.name}" será removido permanentemente.`,
                              okText: "Sim, excluir",
                              okType: "danger",
                              cancelText: "Não",
                              onOk() {
                                deleteEventById(event.id);
                              },
                            });
                          },
                        }
                      : null,
                  ];
                  const getStatusColor = () => {
                    if (event.status === "AGENDADO") return "#3b82f6";
                    if (event.status === "ANDAMENTO") return "#22c55e";
                    if (event.status === "FINALIZADO") return "#ef4444";
                    return "gray";
                  };

                  return (
                    <Col xs={24} md={12} lg={8} key={event.id}>
                      <Card
                        hoverable
                        onClick={(e) => {
                          if ((e.target as HTMLElement).closest("button"))
                            return;
                          navigate(`/events/${event.id}`);
                        }}
                        style={{
                          borderRadius: 16,
                          overflow: "hidden",
                          position: "relative",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        }}
                        cover={
                          <div style={{ position: "relative" }}>
                            <img
                              src={
                                event.image ||
                                (event as any).imageUrl ||
                                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='18'>Sem imagem</text></svg>"
                              }
                              style={{
                                height: 180,
                                width: "100%",
                                objectFit: "cover",
                              }}
                              alt={event.name}
                            />

                            <div
                              style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                background: getStatusColor(),
                                color: "#fff",
                                padding: "6px 12px",
                                borderRadius: 999,
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >
                              {event.status}
                            </div>
                          </div>
                        }
                        bodyStyle={{ padding: 16 }}
                      >
                        <div style={{ padding: 16 }}>
                          <h3 style={{ marginBottom: 6, color: "#1f2937" }}>
                            {event.name}
                          </h3>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              color: "#6b7280",
                              marginBottom: 4,
                            }}
                          >
                            <EnvironmentOutlined style={{ color: "#9ca3af" }} />
                            <span>{location}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              color: "#6b7280",
                              marginBottom: 15,
                            }}
                          >
                            <CalendarOutlined style={{ color: "#9ca3af" }} />
                            <span>
                              {event.initialDate
                                ? new Date(event.initialDate).toLocaleString(
                                    "pt-br",
                                  )
                                : "-"}
                            </span>
                          </div>
                        </div>

                        {isAdminUser && (
                          <Dropdown menu={{ items }} trigger={["click"]}>
                            <Button
                              type="text"
                              icon={<MoreOutlined />}
                              style={{
                                position: "absolute",
                                bottom: 10,
                                right: 30,
                                background: "#f3f4f6",
                                borderRadius: 8,
                              }}
                            />
                          </Dropdown>
                        )}
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <Table
                columns={columns}
                dataSource={paginatedEvents}
                rowKey="id"
                loading={loading}
                pagination={false}
                onRow={(record) => ({
                  onClick: () =>
                    navigate(`/events/${record.id}`, {
                      state: { from: "event-list", event: record },
                    }),
                  style: { cursor: "pointer" },
                })}
                locale={{
                  emptyText: <Empty description="Nenhum evento encontrado" />,
                }}
              />
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {totalPages > 1 && (
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalItems}
                  onChange={(page) => setCurrentPage(page)}
                />
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>Exibir</span>
                <Select
                  defaultValue={12}
                  options={[
                    { value: 6, label: "6" },
                    { value: 12, label: "12" },
                    { value: 24, label: "24" },
                  ]}
                  style={{ width: 80 }}
                />
                <span>por página</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        title="Detalhes do Evento"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedEvent && (
          <>
            <p>
              <b>Nome:</b> {selectedEvent.name}
            </p>
            <p>
              <b>Descrição:</b> {selectedEvent.description}
            </p>
            <p>
              <b>Localização:</b>{" "}
              {selectedEvent.street +
                ", " +
                selectedEvent.neighborhood +
                " / " +
                selectedEvent.city}
            </p>
            <p>
              <b>Data Inicial:</b>{" "}
              {new Date(selectedEvent.initialDate).toLocaleString("pt-BR")}
            </p>
            <p>
              <b>Data Final:</b>{" "}
              {selectedEvent.finalDate
                ? new Date(selectedEvent.finalDate).toLocaleString("pt-BR")
                : "-"}
            </p>
            <p>
              <b>Status:</b> {selectedEvent.status}
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default ListEvent;
