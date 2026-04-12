import React from "react";
import { Button, DatePicker, Form, Input } from "antd";
import useEmployee from "../../hooks/employees/useEmployee";

const CreateEmployee: React.FC = () => {
  const {
    name,
    setName,
    cpf,
    setCPF,
    birthDate,
    setBirthDate,
    email,
    setEmail,
    phone,
    setPhone,
    role,
    setRole,
    fetchEmployee,
    loading
  } = useEmployee();

  return (
    <Form onFinish = {fetchEmployee} layout="vertical">
        <Form.Item
            label="Nome"
            name="name"
            rules={[{required: true, message: "Informe o nome!"}]}
        >
            <Input
                placeholder="Nome do funcionário"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </Form.Item>

        <Form.Item
            label="CPF"
            name="cpf"
            rules={[{ required: true, message: "Informe o CPF!" }]}
        >
            <Input
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
            />
        </Form.Item>

        <Form.Item
            label="Data de nascimento"
            name="birthDate"
            rules={[{ required: true, message: "Selecione a data!" }]}
        >
            <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                value={birthDate}
                onChange={(date) => date && setBirthDate(date)}
            />
        </Form.Item>

        <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Informe o email!" }]}
        >
            <Input
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </Form.Item>

        <Form.Item
            label="Telefone"
            name="phone"
            rules={[{ required: true, message: "Informe o telefone!" }]}
        >
            <Input
            placeholder="(31) 99999-9999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
        </Form.Item>

        <Form.Item
            label="Cargo"
            name="role"
            rules={[{ required: true, message: "Informe o cargo!" }]}
        >
            <Input
            placeholder="Ex: Desenvolvedor"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" htmlType="submit" loading={loading}>
            Criar Funcionário
            </Button>
        </div>

        </Form>
    );
    };

export default CreateEmployee;