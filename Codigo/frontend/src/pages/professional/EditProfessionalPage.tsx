import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Skeleton, Alert } from "antd";
import CreateProfessional from "../../components/professional/createProfessional/CreateProfessional";
import { getProfessionalById } from "../../services/professional/integration";
import type { ProfessionalDTO } from "../../types/ProfessionalDTO";

const { Content } = Layout;

const EditProfessionalPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [professional, setProfessional] = useState<ProfessionalDTO | null>(null);

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
        setProfessional(prof);
      } catch (err: any) {
        setError(err?.response?.data?.message || err?.response?.data || "Erro ao carregar profissional");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

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
        <CreateProfessional mode="edit" professionalId={id} initialProfessional={professional} />
      </Content>
    </Layout>
  );
};

export default EditProfessionalPage;
