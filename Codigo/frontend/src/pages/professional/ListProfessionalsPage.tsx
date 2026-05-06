import { Layout } from "antd";
import ListProfessionals from "../../components/professional/ListProfessional/ListProfessionals";

const { Content } = Layout;

const ListProfessionalsPage = () => {
  return (
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              borderRadius: 8,
              overflowY: "auto",
            }}
          >
            <ListProfessionals emptyDescription="Nenhum profissional encontrado" />
          </Content>
        </Layout>
      </Layout>
  );
};

export default ListProfessionalsPage;