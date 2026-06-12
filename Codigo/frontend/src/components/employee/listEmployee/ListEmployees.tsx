import { Row, Col, Card, Select } from "antd";
import { Pagination } from "antd";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DatePicker,
  Dropdown,
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
  AppstoreOutlined,
  UnorderedListOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { ListEmployeesContainer } from "./styles";
import { maskCPF } from "../../../functions/maskCpf";
import { maskPhone } from "../../../functions/maskPhone";
import { openErrorNotification } from "../../errorNotification";
import { isAdmin } from "../../../functions/userIsAdmin";

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

  const isAdminUser = isAdmin();  

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
      render: (cpf: string) => cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : "-",
    },
    {
      title: "Data de Nascimento",
      dataIndex: "birthDate",
      render: (date: string) => date ? new Date(date).toLocaleDateString("pt-br") : "-",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      render: (email: string) => email,
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      render: (phone: string) => phone ? phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3") : "-",
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
          
          isAdminUser ?
          {
            key: "edit",
            label: "Editar",
            icon: <EditOutlined />,
            onClick: () => {
              setEditingEmployee({ ...record });
              setIsEditModalOpen(true);
            }
          } : null,

          isAdminUser ? 
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
          } : null,
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const totalItems = employees?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedEmployees = (employees || []).slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
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
  const getInitials = (name: string) => {
    if (!name) return "--";

    return name
      ?.replace(/\s+/g, "")
      .slice(0,2)
      .toUpperCase();
  };

  const navigate = useNavigate();

  const openEmployee = (id: string) => {
    navigate(`/employees/${id}`);
  };

return (
    <>
      <Row gutter={20} align= "top">
        <Col xs={24} md={6} style={{display: "flex"}}>
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

              {isAdminUser && ( 
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
              )}
             
            </div>
          </div>

          <div style={{marginTop: 20}}>
              {viewMode === "grid" ? (
                <Row gutter={[16, 16]}>
                  {paginatedEmployees?.map((employee:any) => {
                    const items: MenuProps["items"] = [
                      isAdminUser ?
                      {
                        key: "edit",
                        label: "Editar",
                        icon: <EditOutlined />,
                        onClick: ({ domEvent }) => {
                          domEvent.stopPropagation();
                          setEditingEmployee({...employee});
                          setIsEditModalOpen(true);
                        },

                      } : null,

                      isAdminUser ? 
                      {
                        key: "delete",
                        label: <span style={{ color: "red" }}>Deletar</span>,
                        icon: <DeleteOutlined style={{ color: "red" }} />,
                        onClick: ({ domEvent }) => {
                          domEvent.stopPropagation();
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
                      } : null,
                    ];
                    
                    return (
                      <Col xs={24} md={12} lg={8} key={employee.id}>
                        <Card
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setIsViewModalOpen(true);
                          }}
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
                              onClick={(e) => e.stopPropagation()}
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
                    dataSource={paginatedEmployees}
                    rowKey="id"
                    loading={loading}
                    pagination={false}
                  />
                )}
            </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                    flexWrap: "wrap",
                    gap: 10,
                  }}>

                    <div style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center"
                    }}>
                      {totalPages > 1 &&(
                        <Pagination
                          current={currentPage}
                          pageSize={pageSize}
                          total={totalItems}
                          onChange={(page) => setCurrentPage(page)}
                        />
                      )}
                    </div>
                    
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    }}>
                      <div style={{display: "flex", alignItems: "center", gap: 8}}>
                        <span>Exibir</span>
                        <Select
                          defaultValue={12}
                          options={[
                            {value: 6, label: "6"},
                            {value: 12, label: "12"},
                            {value: 24, label: "24"},
                          ]}
                          style={{width: 80}}
                        />
                        <span>por página</span>
                      </div>
                    </div>
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