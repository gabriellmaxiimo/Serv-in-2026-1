
import { useState } from "react";
import {
  Button,
  DatePicker,
  Dropdown,
  Empty,
  Input,
  Select,
  Table,
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
import { Modal } from "antd";

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
  title="Detalhes do Evento"
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={null}
>
  {selectedEvent && (
    <>
      <p><b>Nome:</b> {selectedEvent.name}</p>
      <p><b>Descrição:</b> {selectedEvent.description}</p>
      <p><b>Localização:</b> {selectedEvent.location}</p>
      <p><b>Data Inicial:</b> {new Date(selectedEvent.initialDate).toLocaleString("pt-BR")}</p>
      <p><b>Data Final:</b> {selectedEvent.finalDate ? new Date(selectedEvent.finalDate).toLocaleString("pt-BR") : "-"}</p>
      <p><b>Status:</b> {selectedEvent.status}</p>
    </>
  )}
</Modal>

</>   
  );
};

export default ListEvent;
