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
  Modal,
  Switch,
  Form,
} from "antd";
import useListEmployees from "../../../hooks/employees/useListEmployees";
import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  MoreOutlined,
} from "@ant-design/icons";
import { ListEmployeesContainer } from "./styles";
import { maskCPF } from "../../../functions/maskCpf";
import { maskPhone } from "../../../functions/maskPhone";
import { openErrorNotification } from "../../errorNotification";

type ListEmployeesProps = {
  emptyDescription?: string;
};

const ListEmployees: React.FC<ListEmployeesProps> = ({
  emptyDescription = "Nenhum funcionario encontrado",
}) => {
  const { 
    employees, 
    loading, 
    setFilterName, 
    setFilterCPF, 
    setFilterBirthDate, 
    setFilterEmail, 
    setFilterPhone,
    deleteEmployeeById,
    fetchEmployees,
    fetchUpdateEmployee
  } = useListEmployees();

  const [form] = Form.useForm();

    

  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        const maskedValue = maskCPF(rawValue);
        const onlyNumbers = rawValue.slice(0, 11);
  
        form.setFieldsValue({ cpf: maskedValue });
        setEditingEmployee({
                ...editingEmployee,
                  cpf: onlyNumbers,
                });
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        const maskedValue = maskPhone(rawValue);
        const onlyNumbers = rawValue.slice(0, 11);

        if(onlyNumbers.trim() === "") {
          openErrorNotification("Telefone inválido", "O telefone não pode estar vazio.");
        }
  
        form.setFieldsValue({ phone: maskedValue });
        setEditingEmployee({
                ...editingEmployee,
                  phone: onlyNumbers,
                });
    };

    

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
        render: (role: boolean) => role ? "Gerente" : "Funcionário"
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
              setIsViewModalOpen(true);
            },
          },
          {
            key: "edit",
            label: "Editar",
            icon: <EditOutlined />,
            onClick: () => {
              setEditingEmployee({ ...record });
              setIsEditModalOpen(true);
            }
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
      <ListEmployeesContainer>
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
      </ListEmployeesContainer>

      <Table
        columns={columns}
        dataSource={employees}
        loading={loading}
        rowKey="id"
        locale={{ emptyText: <Empty description={emptyDescription} /> }}
      />
      <Modal
        title="Detalhes do Funcionario"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
      >
        {selectedEmployee && (
          <>
            <p><b>Nome:</b> {selectedEmployee.name}</p>
            <p><b>CPF:</b> {selectedEmployee.cpf}</p>
            <p><b>Data de Nascimento:</b> {new Date(selectedEmployee.birthDate).toLocaleString("pt-BR")}</p>
            <p><b>E-Mail:</b> {selectedEmployee.email}</p>
            <p><b>Telefone:</b> {selectedEmployee.phone}</p>
            <p><b>Cargo:</b> {selectedEmployee.role ? "Gerente" : "Funcionário"}</p>
          </>
        )}
      </Modal>

      <Modal
        title="Editar Funcionario"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingEmployee(null);
        }}
        okText="Salvar"
        onOk={async () => {
          await fetchUpdateEmployee(editingEmployee.id, editingEmployee);

          await fetchEmployees();

          setIsEditModalOpen(false);
          setEditingEmployee(null);
        }}
      >
        {editingEmployee && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Input
              value={editingEmployee.name}
              onChange={(e) =>
                setEditingEmployee({
                  ...editingEmployee,
                  name: e.target.value,
                })
              }
              placeholder="Nome"
            />

            <Input
              value={editingEmployee.cpf}
              onChange={handleCpfChange}
              placeholder="CPF"
              disabled={true}
            />

            <Input
              value={editingEmployee.email}
              onChange={(e) =>
                setEditingEmployee({
                  ...editingEmployee,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />

            <Input
              value={editingEmployee.phone}
              onChange={handlePhoneChange}
              placeholder="(99) 9 9999-9999"
            />

            <Form.Item label="Gerente" valuePropName="checked">
              <Switch 
                checked={editingEmployee.role}
                onChange={(checked) => setEditingEmployee({...editingEmployee, role: checked})} 
              />
            </Form.Item>
          </div>
        )}
       </Modal>


</>   
  );
};

export default ListEmployees;