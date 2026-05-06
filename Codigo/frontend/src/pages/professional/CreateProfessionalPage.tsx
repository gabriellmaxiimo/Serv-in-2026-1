import { ConfigProvider, Layout } from "antd";
import CreateProfessional from "../../components/professional/createProfessional/CreateProfessional";

const { Content } = Layout;

const CreateProfessionalPage = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#050521",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            overflowY: "auto",
          }}
        >
          <CreateProfessional />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default CreateProfessionalPage;
