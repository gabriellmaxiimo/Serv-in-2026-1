import { Button, Dropdown, Empty, Form, Table, type MenuProps } from "antd";
import useListEvent from "../../hooks/event/useListEvent";
import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  LoadingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";

const ListEvent: React.FC = () => {
  const { events, loading } = useListEvent();

  const { confirm } = Modal;

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
        else if (firstLetter === "Finalizado") color = "gray";

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
            // TODO: PARA QUEM FOR FAZER O VIEW, CHAMAR AQUI A FUNÇÃO DE VIEW DO HOOK E PASSAR O ID DO EVENTO
            onClick: () => console.log("Visualizar evento com ID:", record.id),
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
                  // TODO: PARA QUEM FOR FAZER O DELETE, CHAMAR AQUI A FUNÇÃO DE DELETE DO HOOK E PASSAR O ID DO EVENTO
                  console.log("Deletar evento com ID:", record.id);
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
      {!loading ? (
        <Table
          columns={columns}
          dataSource={events}
          loading={loading}
          locale={{
            emptyText: <Empty description="Nenhum evento encontrado" />,
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <LoadingOutlined />
        </div>
      )}
    </>
  );
};

export default ListEvent;
