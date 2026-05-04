import { Layout } from "antd";
import ListEvent from "../../components/listEvent/ListEvent";

const { Content } = Layout;

const ListEventPage = () => {
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
            <ListEvent></ListEvent>
          </Content>
        </Layout>
      </Layout>
  );
};

export default ListEventPage;
