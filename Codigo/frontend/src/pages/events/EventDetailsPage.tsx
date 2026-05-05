import { useLocation } from "react-router-dom";

const EventDetailsPage = () => {
  const location = useLocation();
  const event = location.state;

  if (!event) return <p>Evento não encontrado</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Detalhes do Evento</h1>

      {/* 🔥 IMAGEM */}
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt="Evento"
          style={{
            width: "100%",
            maxHeight: 300,
            objectFit: "cover",
            marginBottom: 20,
            borderRadius: 12,
          }}
        />
      )}

      <p><strong>Nome:</strong> {event.name}</p>
      <p><strong>Descrição:</strong> {event.description}</p>
      <p><strong>Data Inicial:</strong> {event.initialDate}</p>
      <p><strong>Data Final:</strong> {event.finalDate}</p>
      <p><strong>Localização:</strong> {event.location}</p>
      <p><strong>Status:</strong> {event.status}</p>
    </div>
  );
};

export default EventDetailsPage;