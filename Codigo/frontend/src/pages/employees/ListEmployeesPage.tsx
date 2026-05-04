import { Layout } from "antd";
import ListEmployee from "../../components/employee/listEmployee/ListEmployees";

const { Content } = Layout;

const ListEmployeesPage = () => {
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
            <ListEmployee />
          </Content>
        </Layout>
      </Layout>
  );
};

export default ListEmployeesPage;