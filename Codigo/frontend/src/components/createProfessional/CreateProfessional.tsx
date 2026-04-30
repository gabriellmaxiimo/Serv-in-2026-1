import { useEffect, useMemo, useState } from "react";
import { AutoComplete, Button, DatePicker, Form, Input, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useProfessional from "../../hooks/professional/useProfessional";
import { createRole, listRoles } from "../../services/role/integration";

const maskCPF = (value: string) => {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  return numbers
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
};


const maskPhone = (value: string) => {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 10) {
    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return numbers
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};

const areaOptions = [
  { label: "Medicina", value: "MEDICINE" },
  { label: "Segurança", value: "SECURITY" },
  { label: "Alimentação", value: "FOOD_SERVICE" },
  { label: "Bebidas", value: "BEVERAGES" },
  { label: "Limpeza", value: "CLEANING" },
  { label: "Logística", value: "LOGISTICS" },
  { label: "Staff", value: "STAFF" },
  { label: "Recepção", value: "RECEPTION" },
  { label: "Tecnologia", value: "TECHNOLOGY" },
];

interface ExistingRole {
  type: "existing";
  id: string;
  name: string;
}

interface NewRole {
  type: "create";
  name: string;
}

type RoleSelection = ExistingRole | NewRole | null;

const CreateProfessional = () => {
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
    area,
    setArea,
    setRole,
    fetchProfessional,
    loading,
  } = useProfessional();

  const [databaseRoles, setDatabaseRoles] = useState<ExistingRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleSelection>(null);
  const [inputValue, setInputValue] = useState("");
  const [creatingRole, setCreatingRole] = useState(false);

  const loadRoles = async () => {
    try {
      const roleList = await listRoles();
      setDatabaseRoles(
        roleList.map((item) => ({
          type: "existing",
          id: item.id,
          name: item.name,
        }))
      );
    } catch {
      message.error("Não foi possível carregar os cargos");
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const navigate = useNavigate();

  const sanitizeRoleName = (input: string): string => {
    return input
      .trim()
      .replace(/[<>\"'%;()&+]/g, "")
      .slice(0, 100)
      .replace(/\s+/g, " ");
  };

  const filteredRoles = useMemo(() => {
    if (!inputValue.trim()) {
      return databaseRoles;
    }

    const lowerInput = inputValue.toLowerCase();
    return databaseRoles.filter((r) => r.name.toLowerCase().includes(lowerInput));
  }, [inputValue, databaseRoles]);

  const normalizedInput = sanitizeRoleName(inputValue);

  const exactMatch = useMemo(() => {
    if (!normalizedInput) {
      return false;
    }

    return databaseRoles.some(
      (r) => r.name.toLowerCase() === normalizedInput.toLowerCase()
    );
  }, [databaseRoles, normalizedInput]);

  const autoCompleteOptions = useMemo(() => {
    const groups: Array<{ label: string; options: any[] }> = [];

    if (filteredRoles.length > 0) {
      groups.push({
        label: "Cargos existentes",
        options: filteredRoles.map((r) => ({
          value: r.name,
          label: r.name,
          optionType: "existing",
          roleId: r.id,
          roleName: r.name,
        })),
      });
    }

    if (normalizedInput && !exactMatch) {
      groups.push({
        label: "Ação",
        options: [
          {
            value: normalizedInput,
            label: (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <PlusOutlined />
                <span>Criar novo cargo: "{normalizedInput}"</span>
              </div>
            ),
            optionType: "create",
            roleName: normalizedInput,
          },
        ],
      });
    }

    return groups;
  }, [filteredRoles, normalizedInput, exactMatch]);

  const handleRoleSelect = (_value: string, option: any) => {
    if (option.optionType === "existing" && option.roleId) {
      setSelectedRole({
        type: "existing",
        id: option.roleId,
        name: option.roleName,
      });
      setInputValue(option.roleName);
      return;
    }

    setSelectedRole({
      type: "create",
      name: option.roleName,
    });
    setInputValue(option.roleName);
  };

  const handleRoleInputChange = (value: string) => {
    setInputValue(value);
    setSelectedRole(null);
  };

  const resolveRoleSelection = (): RoleSelection => {
    if (selectedRole) {
      return selectedRole;
    }

    const sanitized = sanitizeRoleName(inputValue);
    if (!sanitized) {
      return null;
    }

    const existing = databaseRoles.find(
      (r) => r.name.toLowerCase() === sanitized.toLowerCase()
    );

    if (existing) {
      return existing;
    }

    return {
      type: "create",
      name: sanitized,
    };
  };

  const handleSubmit = async () => {
    try {
      const roleSelection = resolveRoleSelection();

      if (!roleSelection) {
        message.warning("Informe um cargo");
        return;
      }

      let roleName = roleSelection.name;

      if (roleSelection.type === "create") {
        try {
          setCreatingRole(true);
          await createRole(roleSelection.name);
          await loadRoles();

          setSelectedRole({
          type: "existing",
          id: "",
          name: roleSelection.name,
        });

roleName = roleSelection.name;
        } catch (error: any) {
          const errorMessage = error?.response?.data || "Erro ao criar cargo";
          message.error(errorMessage);
          return;
        } finally {
          setCreatingRole(false);
        }
      }

      setRole(roleName);
      const response = await fetchProfessional();

      if (!response) {
        return;
      }

      message.success("Profissional criado com sucesso!");
      setSelectedRole(null);
      setInputValue("");
      navigate("/professional");
    } catch {
      message.error("Erro ao criar profissional");
    }
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Informe o nome!" }]}
      >
        <Input
          placeholder="Nome do profissional"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>

      <Form.Item
      label="CPF"
      rules={[{ required: true, message: "Informe o CPF!" }]}
      >
      <Input
      placeholder="000.000.000-00"
      value={maskCPF(cpf)}
      onChange={(e) => {
      const numbers = e.target.value.replace(/\D/g, "").slice(0, 11);
      setCPF(numbers);
      }}
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
        label="Área de atuação"
        name="area"
        rules={[{ required: true, message: "Selecione a área!" }]}
      >
        <Select
          placeholder="Selecione a área"
          options={areaOptions}
          value={area ?? undefined}
          onChange={(value) => setArea(value)}
        />
      </Form.Item>

      <Form.Item
        label="Cargo"
        name="role"
        rules={[{ required: true, message: "Informe o cargo!" }]}
      >
        <AutoComplete
          options={autoCompleteOptions}
          value={inputValue}
          onSelect={handleRoleSelect}
          onChange={handleRoleInputChange}
          placeholder="Digite ou selecione um cargo"
          filterOption={false}
          dropdownStyle={{ maxHeight: 220, overflowY: "auto" }}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
      label="Telefone"
      rules={[{ required: true, message: "Informe o telefone!" }]}
      >
      <Input
      placeholder="(31) 99999-9999"
      value={maskPhone(phone)}
      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
      />
  </Form.Item>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" htmlType="submit" loading={loading || creatingRole}>
          Criar Profissional
        </Button>
      </div>
    </Form>
  );
};

export default CreateProfessional;
