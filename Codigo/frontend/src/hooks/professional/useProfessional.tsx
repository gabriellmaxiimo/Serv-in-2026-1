import { useState } from "react";
import type { Dayjs } from "dayjs";
import { createProfessional } from "../../services/professional/integration";
import { openErrorNotification } from "../../components/errorNotification";
import { openSuccessNotification } from "../../components/successNotification";
import type { CreateProfessionalDTO } from "../../types/CreateProfessionalDTO";

type ProfessionalArea = CreateProfessionalDTO["area"];

const useProfessional = () => {
  const [name, setName] = useState<string>("");
  const [cpf, setCPF] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [area, setArea] = useState<ProfessionalArea | null>(null);
  const [role, setRole] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const fetchProfessional = async () => {
    const normalizedCpf = cpf.replace(/\D/g, "");
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedRole = role.trim();

    
    if (
      name.trim() === "" ||
      normalizedCpf === "" ||
      !birthDate ||
      normalizedEmail === "" ||
      phone.trim() === "" ||
      !area ||
      normalizedRole === ""
    ) {
      openErrorNotification("Campos obrigatorios", "Preencha todos os campos.");
      return;
    }

    if (normalizedCpf.length !== 11) {
      openErrorNotification("CPF inválido", "Informe um CPF com 11 dígitos numéricos.");
      return;
    }

    setLoading(true);

    try {
      const response = await createProfessional({
        name: name.trim(),
        cpf: normalizedCpf,
        birthDate: birthDate.format("YYYY-MM-DD"),
        email: normalizedEmail,
        phone: phone.trim(),
        area,
        role: normalizedRole,
      });

      if (response) {
        openSuccessNotification("Profissional criado com sucesso!");
      }

      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data || "Erro interno";
      openErrorNotification(
        "Erro ao criar profissional",
        errorMessage,
      );
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
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
    role,
    setRole,
    fetchProfessional,
    loading,
  };
};

export default useProfessional;
