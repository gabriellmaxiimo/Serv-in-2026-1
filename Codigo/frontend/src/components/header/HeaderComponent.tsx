import { LeftOutlined } from "@ant-design/icons";
import Button from "../button/Button";
import { HeaderContainer, SearchContainer } from "./styles";

const HeaderEventComponent = () => {
  return (
    <>
      <HeaderContainer>
        <SearchContainer>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
          </div>

          {window.location.pathname === "/events" && (
            <Button 
              onClick={() => (window.location.href = "/events/create")}
            >
              Criar Evento
            </Button>
          )}

          {window.location.pathname === "/events/create" && (
            <Button 
              onClick={() => (window.history.back())} 
              disabled={false} 
              children={"Voltar"}
              icon={<LeftOutlined />}>
            </Button>
          )}
        </SearchContainer>
      </HeaderContainer>
    </>
  );
};

export default HeaderEventComponent;
