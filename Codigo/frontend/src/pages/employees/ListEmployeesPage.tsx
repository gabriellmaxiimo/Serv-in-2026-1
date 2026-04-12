import { Layout, ConfigProvider } from "antd";
import HeaderEventComponent from "../../components/header/HeaderComponent";
import ListEmployee from "../../components/employees/ListEmployees";

const { Content } = Layout;

const ListEmployeesPage = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#050521",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
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
            <ListEmployee />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default ListEmployeesPage;