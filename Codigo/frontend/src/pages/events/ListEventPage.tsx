import { Layout } from "antd";
import ListEvent from "../../components/event/listEvent/ListEvent";
import { isAdmin } from "../../functions/userIsAdmin";

const { Content } = Layout;

console.log(isAdmin());

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
