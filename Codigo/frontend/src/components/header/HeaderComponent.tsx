import { HeaderContainer, SearchContainer } from "./styles";

const HeaderFlightsComponent = () => {

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
        </SearchContainer>
      </HeaderContainer>
    </>
  );
};

export default HeaderFlightsComponent;
