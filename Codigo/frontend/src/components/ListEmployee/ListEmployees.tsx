import { Row, Col, Card, Select } from "antd";
import React from "react";
import { useState } from "react";
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Table,
  type MenuProps,
  Modal,
} from "antd";
import useListEmployees from "../../hooks/employees/useListEmployees";
import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  MoreOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

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
    deleteEmployeeById,
    fetchEmployees,
    fetchUpdateEmployee
  } = useListEmployees();

  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const formatCPF = (cpf: string) => {
    if (!cpf) return "-";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPhone = (phone: string) => {
    if (!phone) return "-";
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };
  const [viewMode,setViewMode] = useState<"grid" | "list">("grid");
  const fieldStyle = {
    marginBottom: 10,
  };
  const roleOptions = [
    { label: "Admin", value: "ADMIN" },
    { label: "Funcionário", value: "FUNCIONARIO" },
  ];
  const getInitials = (name: string) => {
    if (!name) return "--";

    return name
      ?.replace(/\s+/g, "")
      .slice(0,2)
      .toUpperCase();
  };

return (
    <>
      <Row gutter={20} align= "top">
        <Col xs={24} md={6} style={{display: "flex"}}>
          <Card style={{
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
            }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}>
              <span style={{
                fontWeight: 600,
                fontSize: 16,
                color: "#1f2937"
              }}>
                Filtros
              </span>
            </div>
            
            <div style={fieldStyle}>
              <span style={{fontSize: 13, color: "#6b7280"}}>
                Nome do Funcionario
              </span>
              <Input
                placeholder="Buscar por nome..."
                style={{borderRadius: 8, marginTop:4}}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            
            <div style={fieldStyle}>
              <span style={{fontSize: 13, color: "#6b7280"}}>
                CPF do Funcionario
              </span>

              <Input
                placeholder="Buscar por CPF..."
                style={{borderRadius: 8, marginTop: 4}}
                onChange={(e) => setFilterCPF(e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <span style={{fontSize: 13, color: "#6b7280"}}>
                Data de Nascimento
              </span>

                <DatePicker
                  style={{width: "100%", borderRadius: 8}}
                  placeholder="Data de Nascimento"
                  onChange={(date) => setFilterBirthDate(date ? date.toISOString(): null)}
                  format="DD/MM/YYYY"
                />
            </div>

            <div style={fieldStyle}>
              <span style={{fontSize: 13, color: "#6b7280"}}>
                E-mail do Funcionario
              </span>
              <Input
                placeholder="Buscar por e-mail..."
                style={{borderRadius: 8, marginTop:4}}
                onChange={(e) => setFilterEmail(e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <span style={{fontSize: 13, color: "#6b7280"}}>
                Telefone
              </span>

              <Input
                placeholder="Buscar por Telefone..."
                style={{borderRadius: 8, marginTop: 4}}
                onChange={(e) => setFilterPhone(e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <span style={{fontSize: 13, color: "#6b7280"}}>
                Cargo
              </span>

              <Select
                mode="multiple"
                allowClear
                placeholder="Todos os Cargos"
                style={{width: "100%", marginTop: 4, borderRadius: 8}}
                onChange={(value) => setFilterRole(value)}
                options={roleOptions}
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
                background: "#f0fdf4"
              }}
            >
              Limpar Filtro
            </Button>

          </Card>
        </Col>

        <Col xs={24} md={18}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}>
            <div>
              <h2>Funcionários</h2>
              <p>Gerencie seus funcionários</p>
            </div>

            <div style={{display:"flex", gap: 10}}>
              <Button
                icon={<AppstoreOutlined/>}
                type={viewMode === "grid" ? "primary" : "default"}
                onClick={() => setViewMode("grid")}
              />

              <Button
                icon={<UnorderedListOutlined/>}
                type={viewMode === "list" ? "primary" : "default"}
                onClick={() => setViewMode("list")}
              />

              <Button
                  type="primary"
                  style={{
                    background: "#22c55e",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 500,
                  }}
                  onClick={() => (window.location.href = "/employees/create")}
                >
                  + Criar Funcionario
                </Button>
            </div>
          </div>

          <div style={{marginTop: 20}}>
              {viewMode === "grid" ? (
                <Row gutter={[16, 16]}>
                  {employees?.map((employee:any) => {
                    const items: MenuProps["items"] = [
                      {
                        key: "view",
                        label: "Visualizar",
                        icon: <EyeFilled />,
                        onClick: () => {
                          setSelectedEmployee(employee);
                          setIsViewModalOpen(true);
                        },
                      },
                      {
                        key: "edit",
                        label: "Editar",
                        icon: <EditOutlined />,
                        onClick: () => {
                          setEditingEmployee({...employee});
                          setIsEditModalOpen(true);
                        },

                      },
                      {
                        key: "delete",
                        label: <span style={{ color: "red" }}>Deletar</span>,
                        icon: <DeleteOutlined style={{ color: "red" }} />,
                        onClick: () => {
                          confirm({
                            title: "Você tem certeza que deseja excluir este funcionário?",
                            icon: <CloseCircleFilled />,
                            content: `O Funcionário "${employee.name}" será removido permanentemente.`,
                            okText: "Sim, excluir",
                            okType: "danger",
                            cancelText: "Não",
                            onOk() {
                              deleteEmployeeById(employee.id);
                            },
                          });
                        },
                      },
                    ];
                    
                    return (
                      <Col xs={24} md={12} lg={8} key={employee.id}>
                        <Card
                          hoverable
                          style={{borderRadius: 16, position: "relative", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",}}
                          bodyStyle={{padding: 16}}
                        >
                          <div style={{
                            background: "var(--primary)",
                            height: 80,
                            borderRadius: "16px 16px 0 0",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                          }}>
                            <div style={{
                              width: 60,
                              height: 60,
                              borderRadius: "50%",
                              background: "#1f2937",
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 600,
                              fontSize: 18,
                              transform: "translateY(50%)",
                            }}>
                              {getInitials(employee.name)}
                            </div>
                          </div>
                          <div style={{textAlign: "center", marginTop: 40}}>
                            <h3 style={{marginBottom: 4}}>
                              {employee.name}
                            </h3>
                            <p style={{color: "#3b82f6", marginBottom: 10}}>
                              {employee.role}
                            </p>
                          </div>

                          <div style={{fontSize: 13, color: "#6b7280", display: "flex", flexDirection: "column", gap: 6}}>
                            <div style={{display: "flex", alignItems: "center", gap: 8}}>
                              <IdcardOutlined style={{ color: "#9ca3af" }}/>
                              <span>{formatCPF(employee.cpf)}</span>
                            </div>
                            <div style={{display: "flex", alignItems: "center", gap: 8}}>
                              <MailOutlined/>
                              <span>{employee.email}</span>
                            </div>
                            <div style={{display: "flex", alignItems: "center", gap: 8}}>
                              <PhoneOutlined/>
                              <span>{formatPhone(employee.phone)}</span>
                            </div>
                            <div style={{display: "flex", alignItems: "center", gap: 8}}>
                              <CalendarOutlined/>
                              <span>{new Date(employee.birthDate).toLocaleDateString("pt-br")}</span>
                            </div>
                          </div>

                          <Dropdown menu={{items}} trigger={["click"]}>
                            <Button
                              type="text"
                              icon={<MoreOutlined/>}
                              style={{
                                position: "absolute",
                                bottom: 10,
                                right: 10,
                                background: "#f3f4f6",
                                borderRadius: 8,
                              }}
                            />
                          </Dropdown>
                      </Card>
                      </Col>
                    );
                  })}
                </Row>
                ) : (
                  <Table
                    columns={columns}
                    dataSource={employees}
                    rowKey="id"
                    loading={loading}
                    pagination={false}
                  />
                )}
            </div>
        </Col>
      </Row>

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
            <p><b>Cargo:</b> {selectedEmployee.role}</p>
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
            onChange={(e) =>
              setEditingEmployee({
              ...editingEmployee,
                cpf: e.target.value,
              })
            }
            placeholder="CPF"
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
            onChange={(e) =>
              setEditingEmployee({
                ...editingEmployee,
                phone: e.target.value,
              })
             }
            placeholder="Telefone"
          />

          <Input
            value={editingEmployee.role}
            onChange={(e) =>
              setEditingEmployee({
                ...editingEmployee,
                role: e.target.value,
              })
            }
            placeholder="Cargo"
          />
          </div>
        )}
       </Modal>


</>   
  );
};

export default ListEmployees;