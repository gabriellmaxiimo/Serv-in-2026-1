import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { HeaderContainer, SearchContainer } from "./styles";
import { Button } from "antd";

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
              type="primary"
              icon={<PlusOutlined />}
            >
              Criar Evento
            </Button>
          )}

          {window.location.pathname === "/events/create" && (
            <Button 
              onClick={() => (window.location.href = "/events")}
              children={"Voltar"}
              icon={<LeftOutlined />}
              type="primary"
            >
              
            </Button>
          )}
        </SearchContainer>
      </HeaderContainer>
    </>
  );
};

export default HeaderEventComponent;
