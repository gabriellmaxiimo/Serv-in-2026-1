import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Skeleton, Alert } from "antd";
import CreateProfessional from "../../components/professional/createProfessional/CreateProfessional";
import { getProfessionalById } from "../../services/professional/integration";
import useProfessional from "../../hooks/professional/useProfessional";
import type { ProfessionalDTO } from "../../types/ProfessionalDTO";

const { Content } = Layout;

const EditProfessionalPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    setName,
    setCPF,
    setBirthDate,
    setEmail,
    setPhone,
    setArea,
    setRole,
    setStatus,
  } = useProfessional();

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setError("ID do profissional não informado");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const resp = await getProfessionalById(id);
        const prof = resp as ProfessionalDTO;

        setName(prof.name || "");
        setCPF(prof.cpf || "");
        setBirthDate(prof.birthDate ? dayjs(prof.birthDate) : null);
        setEmail(prof.email || "");
        setPhone(prof.phone || "");
        setArea(prof.area || null);
        setRole(prof.role?.name || "");
        setStatus(prof.status || "AVAILABLE");
      } catch (err: any) {
        setError(err?.response?.data?.message || err?.response?.data || "Erro ao carregar profissional");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, setName, setCPF, setBirthDate, setEmail, setPhone, setArea, setRole]);

  if (loading) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", borderRadius: 8 }}>
          <Skeleton active paragraph={{ rows: 6 }} />
        </Content>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", borderRadius: 8 }}>
          <Alert type="error" showIcon message="Não foi possível carregar o profissional" description={error} />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", borderRadius: 8 }}>
        <h3>Editar Profissional</h3>
        <CreateProfessional mode="edit" professionalId={id} />
      </Content>
    </Layout>
  );
};

export default EditProfessionalPage;
