import { Layout, ConfigProvider } from "antd";
import HeaderEventComponent from "../../components/header/HeaderComponent";
import ListEvent from "../../components/listEvent/ListEvent";

const { Content } = Layout;

const ListEventPage = () => {
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
            <ListEvent></ListEvent>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default ListEventPage;
