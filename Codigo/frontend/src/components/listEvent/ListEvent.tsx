import logoServin from "../../assets/logo-servin.png";
import { useState } from "react";
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
import useListEvent from "../../hooks/event/useListEvent";
import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  MoreOutlined,
} from "@ant-design/icons";


const ListEvent: React.FC = () => {
  const { 
    events, 
    loading, 
    setFilterName, 
    setFilterLocation, 
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
      title: "Localização",
      dataIndex: "location",
      key: "location",
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
        <Input 
          placeholder="Localização" 
          onChange={(e) => setFilterLocation(e.target.value)} 
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
    content: {
      background: "transparent",
      boxShadow: "none",
      padding: 0,
    },
    body: {
      padding: 0,
      margin: 0,
      background: "transparent",
    },
  }}
>
  <div
    style={{
      background: "linear-gradient(160deg, #020617, #0b1230)",
      borderRadius: "26px",

      margin: "-36px",
      width: "calc(100% + 72px)",

      padding: "40px",
      display: "flex",
      flexDirection: "column",
      gap: "32px",

      boxShadow:
        "0 60px 160px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05)",

      position: "relative",
      overflow: "hidden",
      animation: "modalEnter 0.5s cubic-bezier(.22,1,.36,1)",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.25), transparent 40%), radial-gradient(circle at 80% 60%, rgba(37,99,235,0.2), transparent 40%)",
        opacity: 0.7,
      }}
    />

    <div
      style={{
        textAlign: "center",
        zIndex: 1,
      }}
    >
      <img
        src={logoServin}
        alt="Servin"
        style={{
          height: 72,
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      />

      <div style={{ marginTop: 14 }}>
        <span
          style={{
            fontSize: 12,
            color: "#3b82f6",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          EVENTO
        </span>

        <h1
          style={{
            margin: "4px 0 0 0",
            fontSize: 30,
            fontWeight: 700,
            color: "#e2e8f0",
            letterSpacing: "-0.5px",
          }}
        >
          Detalhes
        </h1>

        <div
          style={{
            width: 70,
            height: 3,
            borderRadius: 999,
            margin: "8px auto 0",
            background: "linear-gradient(90deg, #1677ff, #3b82f6)",
          }}
        />
      </div>
    </div>

    {selectedEvent && (
      <>
        <div
          style={{
            borderRadius: "22px",
            padding: "1px",
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.7), rgba(37,99,235,0.3))",
            zIndex: 1,
          }}
        >
          <div
            style={{
              borderRadius: "21px",
              overflow: "hidden",
              background: "rgba(10,15,40,0.75)",
              backdropFilter: "blur(20px)",
            }}
          >
            <Descriptions
              bordered
              column={1}
              size="middle"
              style={{ width: "100%" }}
              labelStyle={{
                color: "#93c5fd",
                background: "rgba(30,58,138,0.35)",
                fontWeight: 600,
                width: "180px",
              }}
              contentStyle={{
                color: "#e5e7eb",
                background: "rgba(15,23,42,0.5)",
              }}
            >
              <Descriptions.Item label="Nome">
                {selectedEvent.name}
              </Descriptions.Item>

              <Descriptions.Item label="Descrição">
                {selectedEvent.description || "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Localização">
                {selectedEvent.location}
              </Descriptions.Item>

              <Descriptions.Item label="Data Inicial">
                {new Date(selectedEvent.initialDate).toLocaleString("pt-BR")}
              </Descriptions.Item>

              <Descriptions.Item label="Data Final">
                {selectedEvent.finalDate
                  ? new Date(selectedEvent.finalDate).toLocaleString("pt-BR")
                  : "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Status">
                <Tag
                  style={{
                    padding: "6px 20px",
                    borderRadius: "999px",
                    fontWeight: 600,
                    background: "linear-gradient(90deg, #fff, #dbeafe)",
                    color: "#1d4ed8",
                    boxShadow: "0 0 20px rgba(59,130,246,0.6)",
                  }}
                >
                  {selectedEvent.status === "AGENDADO"
                    ? "AGENDADO"
                    : selectedEvent.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <Button
            type="primary"
            style={{
              height: 48,
              padding: "0 26px",
              borderRadius: "16px",
              border: "none",
              fontWeight: 500,
              background:
                "linear-gradient(90deg, #1677ff, #2563eb, #1d4ed8)",
              boxShadow: "0 20px 50px rgba(22,119,255,0.6)",
              transition: "all .25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-4px) scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            📍 Ver Localização
          </Button>

          <Button
            onClick={() => setIsModalOpen(false)}
            style={{
              height: 48,
              padding: "0 26px",
              borderRadius: "16px",
              fontWeight: 500,
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(6px)",
              transition: "all .25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
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
          transform: scale(0.94) translateY(20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .ant-descriptions-row:hover td {
        background: rgba(59,130,246,0.12) !important;
        transition: 0.25s;
      }
    `}
  </style>
</Modal>
</>   
  );
};

export default ListEvent;
