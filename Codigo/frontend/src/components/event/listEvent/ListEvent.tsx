
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DatePicker,
  Dropdown,
  Empty,
  Input,
  Select,
  Table,
  Modal,
  Descriptions,
  Tag,
  type MenuProps,
} from "antd";
import useListEvent from "../../../hooks/event/useListEvent";
import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  MoreOutlined,
} from "@ant-design/icons";
import { logoServin } from "../../../assets";


const ListEvent: React.FC = () => {
  const navigate = useNavigate();
  const { 
    events, 
    loading, 
    setFilterName,
    setFilterInitialDate, 
    setFilterFinalDate, 
    setFilterStatus,
    deleteEventById
  } = useListEvent();

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { confirm } = Modal;

  const statusOptions = [
    { label: "Agendado", value: "AGENDADO" },
    { label: "Andamento", value: "ANDAMENTO" },
    { label: "Finalizado", value: "FINALIZADO" },
  ];

  const columns = [
    {
      title: "Nome do Evento",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Data de Início",
      dataIndex: "initialDate",
      key: "initialDate",
      render: (date: any) => new Date(date).toLocaleString("pt-BR"),
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
            onClick: () => {
              setSelectedEvent(record);
              setIsModalOpen(true);
            },
          },
          {
            key: "edit",
            label: "Editar",
            icon: <EditOutlined />,
            // TODO: PARA QUEM FOR FAZER O EDIT, CHAMAR AQUI O COMPONENTE DE EDIÇÃO E PASSAR O ID DO EVENTO
            onClick: () => console.log("Editar evento com ID:", record.id),
          },
          {
            key: "delete",
            label: <span style={{ color: "red" }}>Deletar</span>,
            icon: <DeleteOutlined style={{ color: "red" }} />,
            onClick: () => {
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
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

return (
    <>
      
      <div style={{ width: "100%", marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Input 
          placeholder="Nome do evento" 
          onChange={(e) => setFilterName(e.target.value)} 
        />
        <DatePicker 
          style={{ width: "100%" }} 
          placeholder="A partir de" 
          onChange={(date) => setFilterInitialDate(date ? date.toISOString() : null)} 
          format="DD/MM/YYYY"
        />
        <DatePicker 
          style={{ width: "100%" }} 
          placeholder="Até" 
          onChange={(date) => setFilterFinalDate(date ? date.toISOString() : null)} 
          format="DD/MM/YYYY"
        />

        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Status"
          onChange={(value) => setFilterStatus(value)}
          options={statusOptions}
        />
      </div>

      <Table
        columns={columns}
        dataSource={events}
        loading={loading}
        rowKey="id"
        locale={{ emptyText: <Empty description="Nenhum evento encontrado" /> }}
      />

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={820}
        centered
        style={{ padding: 0 }}
        styles={{
          body: {
            padding: 0,
            margin: 0,
            background: "transparent",
          },
        }}
      >
        <div
          style={{
            background: "#050521",
            borderRadius: "26px",
            margin: "-36px",
            width: "calc(100% + 72px)",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
            position: "relative",
            overflow: "hidden",
            animation: "modalEnter 0.5s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <img
              src={logoServin}
              alt="Servin"
              style={{ height: 72 }}
            />

            <div style={{ marginTop: 16 }}>
              <span
                style={{
                  fontSize: 12,
                  color: "#1777FF",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                EVENTO
              </span>

              <h1
                style={{
                  margin: "6px 0 0 0",
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                Detalhes do Evento
              </h1>

              <div
                style={{
                  width: 60,
                  height: 3,
                  borderRadius: 999,
                  margin: "10px auto 0",
                  background: "#1777FF",
                }}
              />
            </div>
          </div>

          {selectedEvent && (
            <>

              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid rgba(23,119,255,0.2)",
                  overflow: "hidden",
                }}
              >
                <Descriptions
                  bordered
                  column={1}
                  size="middle"
                  style={{ width: "100%" }}
                  labelStyle={{
                    color: "#FFFFFF",
                    background: "rgba(23,119,255,0.1)",
                    fontWeight: 600,
                    width: "180px",
                  }}
                  contentStyle={{
                    color: "#FFFFFF",
                    background: "transparent",
                  }}
                >
                  <Descriptions.Item label="Nome">
                    {selectedEvent.name}
                  </Descriptions.Item>

                  <Descriptions.Item label="Descrição">
                    {selectedEvent.description || "-"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Data Inicial">
                    {new Date(selectedEvent.initialDate).toLocaleString("pt-BR")}
                  </Descriptions.Item>

                  <Descriptions.Item label="Data Final">
                    {selectedEvent.finalDate
                      ? new Date(selectedEvent.finalDate).toLocaleString("pt-BR")
                      : "-"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Localização">
                    {`${selectedEvent.cep} - ${selectedEvent.city}, ${selectedEvent.state} (${selectedEvent.street}, ${selectedEvent.neighborhood})`}
                  </Descriptions.Item>

                  <Descriptions.Item label="Status">
                    <Tag
                      style={{
                        padding: "6px 18px",
                        borderRadius: "999px",
                        fontWeight: 600,
                        background: "#1777FF",
                        color: "#FFFFFF",
                      }}
                    >
                      {selectedEvent.status === "AGENDADO"
                        ? "AGENDADO"
                        : selectedEvent.status}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </div>

            
              <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                navigate(`/events/${selectedEvent.id}/professionals`, {
                  state: { eventName: selectedEvent.name },
                });
              }}
              className="btn-azul-modal"
            >
              Gerenciar profissionais
            </Button>
          </div>

        <Button
          onClick={() => setIsModalOpen(false)}
          className="btn-azul-modal"
        >
          Fechar
        </Button>
      </div>
      </>
      )}
      </div>

      <style>
        {`
          @keyframes modalEnter {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          .ant-descriptions-row:hover td {
            background: rgba(23,119,255,0.15) !important;
            transition: 0.2s;
          }

          /* 🔥 BOTÕES IGUAL AO AGENDADO */
          .btn-azul-modal {
            background-color: #1777FF !important;
            color: #FFFFFF !important;
            border: none !important;
          }

          .btn-azul-modal:hover {
            background-color: #0f5edb !important;
          }
        `}
      </style>
      </Modal>
</>   
  );
};

export default ListEvent;
