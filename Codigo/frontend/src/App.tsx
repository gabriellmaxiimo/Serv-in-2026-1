import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App as AntdApp, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { GlobalStyle } from "./components/global-style";
import SideBar from "./components/sideBar/SideBar";
import SupportButton from "./components/supportButton/SupportButton";
import CreateEventPage from "./pages/events/CreateEventPage";
import ListEventPage from "./pages/events/ListEventPage";
import PaginaListaFuncionarios from "./pages/employees/PaginaListaFuncionarios";
import PaginaCadastroFuncionario from "./pages/employees/PaginaCadastroFuncionario";

function App() {
  return (
    <>
      <AntdApp>
        <GlobalStyle />
        <SupportButton />

        <BrowserRouter>
          <Layout style={{ minHeight: "100vh" }}>
            <SideBar />
            <Layout>
              <Content style={{ background: "#fff" }}>
                <Routes>
                  <Route path="/" element={<div>Página Inicial</div>} />
                  <Route path="/events" element={<ListEventPage />} />
                  <Route path="/events/create" element={<CreateEventPage />} />
                  <Route path="/employees" element={<PaginaListaFuncionarios />} />
                  <Route path="/employees/cadastro" element={<PaginaCadastroFuncionario />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      </AntdApp>
    </>
  );
}

export default App;
