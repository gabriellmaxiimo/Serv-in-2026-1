import { Layout, ConfigProvider } from "antd";
import CreateEvent from "../../components/event/createEvent/CreateEvent";

const { Content } = Layout;

const CreateEventPage = () => {
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
            <CreateEvent />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default CreateEventPage;
