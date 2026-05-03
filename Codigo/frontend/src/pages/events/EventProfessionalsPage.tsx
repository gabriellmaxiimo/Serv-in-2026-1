import { Layout } from "antd";
import { useLocation, useParams } from "react-router-dom";
import HeaderEventComponent from "../../components/layout/header/HeaderComponent";
import EventProfessionals from "../../components/event/eventProfessionals/EventProfessionals";

const { Content } = Layout;

const EventProfessionalsPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const eventName = (location.state as { eventName?: string })?.eventName;

  if (!id) return null;

  return (
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
        <EventProfessionals eventId={id} eventName={eventName} />
      </Content>
    </Layout>
  );
};

export default EventProfessionalsPage;
