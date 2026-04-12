import React from "react";
import { useState } from "react";
import {
  Button,
  DatePicker,
  Dropdown,
  Empty,
  Input,
  Table,
  type MenuProps,
} from "antd";
import useListEmployees from "../../hooks/employees/useListEmployees";
import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  MoreOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";

const ListEmployees: React.FC = () => {
  const { 
    employees, 
    loading, 
    setFilterName, 
    setFilterCPF, 
    setFilterBirthDate, 
    setFilterEmail, 
    setFilterPhone,
    setFilterRole,
    deleteEmployeeById
  } = useListEmployees();

  console.log(employees);

  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { confirm } = Modal;

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      render: (cpf: string) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
    },
    {
      title: "Data de Nascimento",
      dataIndex: "birthDate",
      render: (date: string) => new Date(date).toLocaleDateString("pt-br"),
    },
    {
      title: "E-mail",
      dataIndex: "email",
      render: (email: string) => email,
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      render: (phone: string) => phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"),
    },
    {
        title: "Cargo",
        dataIndex: "role",
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
              setSelectedEmployee(record);
              setIsModalOpen(true);
            },
          },
          {
            key: "edit",
            label: "Editar",
            icon: <EditOutlined />,
            // TODO: PARA QUEM FOR FAZER O EDIT, CHAMAR AQUI O COMPONENTE DE EDIÇÃO E PASSAR O ID DO EVENTO
            onClick: () => console.log("Editar Funcionario com ID:", record.id),
          },
          {
            key: "delete",
            label: <span style={{ color: "red" }}>Deletar</span>,
            icon: <DeleteOutlined style={{ color: "red" }} />,
            onClick: () => {
              confirm({
                title: "Você tem certeza que deseja excluir este funcionario?",
                icon: <CloseCircleFilled />,
                content: `O funcionario "${record.name}" será removido permanentemente.`,
                okText: "Sim, excluir",
                okType: "danger",
                cancelText: "Não",
                onOk() {
                  deleteEmployeeById(record.id);
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
          style={{flex: "1 1 200px"}}
          placeholder="Nome" 
          onChange={(e) => setFilterName(e.target.value)} 
        />
        <Input 
          style={{flex: "1 1 180px"}}
          placeholder="CPF" 
          onChange={(e) => setFilterCPF(e.target.value)} 
        />
        <DatePicker 
          style={{flex: "1 1 200px"}}
          placeholder="Data de Nascimento"
          onChange={(date) => setFilterBirthDate(date?date.toISOString():null)}format="DD/MM/YYYY"
        />
        <Input
          style={{flex: "1 1 200px"}}
          placeholder="E-mail"
          onChange={(e) => setFilterEmail(e.target.value)}
        />
        <Input
          style={{flex: "1 1 180px"}}
          placeholder="Telefone"
          onChange={(e) => setFilterPhone(e.target.value)}
        />
        <Input
          style={{flex: "1 1 160px"}}
          placeholder="Cargo"
          onChange={(e) => setFilterRole(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        dataSource={employees}
        loading={loading}
        rowKey="id"
        locale={{ emptyText: <Empty description="Nenhum funcionario encontrado" /> }}
      />
      <Modal
        title="Detalhes do Funcionario"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedEmployee && (
    <>
      <p><b>Nome:</b> {selectedEmployee.name}</p>
      <p><b>CPF:</b> {selectedEmployee.cpf}</p>
      <p><b>Data de Nascimento:</b> {new Date(selectedEmployee.birthDate).toLocaleString("pt-BR")}</p>
      <p><b>E-Mail:</b> {selectedEmployee.email}</p>
      <p><b>Telefone:</b> {selectedEmployee.phone}</p>
      <p><b>Cargo:</b> {selectedEmployee.role}</p>
    </>
  )}
</Modal>

</>   
  );
};

export default ListEmployees;