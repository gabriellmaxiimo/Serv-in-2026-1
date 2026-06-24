import { Layout, ConfigProvider } from "antd";
import EditEvent from "../../components/event/editEvent/EditEvent";

const { Content } = Layout;

const EditEventPage = () => {
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
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              borderRadius: 8,
              overflowY: "auto",
            }}
          >
            <EditEvent />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default EditEventPage;
