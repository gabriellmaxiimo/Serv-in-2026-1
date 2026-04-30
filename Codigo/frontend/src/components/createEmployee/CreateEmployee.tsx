import React from "react";
import { Button, DatePicker, Form, Input, message, Switch } from "antd";
import useEmployee from "../../hooks/employees/useEmployee";
import { useNavigate } from "react-router-dom";
import { maskCPF } from "../../functions/maskCpf";

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
    setRole,
    fetchEmployee,
    loading
  } = useEmployee();

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "");
      const maskedValue = maskCPF(rawValue);
      const onlyNumbers = rawValue.slice(0, 11);

      form.setFieldsValue({ cpf: maskedValue });
      setCPF(onlyNumbers);
  };

  const handleSubmit = async () => {
    try {
      await fetchEmployee();

      message.success("Funcionário criado com sucesso!");

      navigate("/employees");
    } catch (error) {
      message.error("Erro ao criar funcionário");
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
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
                value={maskCPF(cpf)}
                onChange={handleCpfChange}
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

        <Form.Item label="Gerente?" valuePropName="checked">
          <Switch onChange={(checked) => setRole(checked)} />
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