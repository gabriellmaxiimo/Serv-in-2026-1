import { Layout, ConfigProvider } from "antd";
import CreateEmployee from "../../components/employee/createEmployee/CreateEmployee";

const { Content } = Layout;

const CreateEmployeePage = () => {
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
            <CreateEmployee />
          </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default CreateEmployeePage;
