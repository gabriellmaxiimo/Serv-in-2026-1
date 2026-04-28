import { Layout } from "antd";
import HeaderEventComponent from "../../components/header/HeaderComponent";
import ListEmployee from "../../components/ListEmployee/ListEmployees";

const { Content } = Layout;

const ListEmployeesPage = () => {
  return (
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
  );
};

export default ListEmployeesPage;