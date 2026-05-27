import { useParams } from "react-router-dom";

const CredentialEventPage = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: 24 }}>
      <h1>Credenciamento do Evento</h1>

      <p>Evento ID: {id}</p>
    </div>
  );
};

export default CredentialEventPage;