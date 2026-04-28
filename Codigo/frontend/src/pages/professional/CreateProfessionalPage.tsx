import { ConfigProvider, Layout } from "antd";
import HeaderEventComponent from "../../components/header/HeaderComponent";
import CreateProfessional from "../../components/createProfessional/CreateProfessional";

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
        <HeaderEventComponent />
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
