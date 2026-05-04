import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App as AntdApp, Layout , ConfigProvider} from "antd";
import { Content } from "antd/es/layout/layout";
import { GlobalStyle } from "./components/global-style";
import TopBar from "./components/topBar/TopBar";
import NavBar from "./components/navBar/Navbar";
import SupportButton from "./components/supportButton/SupportButton";
import CreateEventPage from "./pages/events/CreateEventPage";
import ListEventPage from "./pages/events/ListEventPage";
import ListEmployeesPage from "./pages/employees/ListEmployeesPage";
import CreateEmployeePage from "./pages/employees/CreateEmployeePage";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0f3c88",
            borderRadius: 8,
          },
        }}
        >
      <AntdApp>
        <GlobalStyle />
        <SupportButton />

        <BrowserRouter>
          <Layout style={{ minHeight: "100vh" }}>
            <TopBar />
            <NavBar />
            <Layout>
              <Content style={{ background: "#fff" }}>
                <Routes>
                  <Route path="/" element={<div>Página Inicial</div>} />
                  <Route path="/events" element={<ListEventPage />} />
                  <Route path="/events/create" element={<CreateEventPage />} />
                  <Route path="/employees" element={<ListEmployeesPage />} />
                  <Route path="/employees/create" element={<CreateEmployeePage />} />
                  <Route path="/professionals" element={<div>Profissonais</div>} />
                  <Route path="/metrics" element={<div>Metricas</div>} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      </AntdApp>
      </ConfigProvider>
    </>
  );
}

export default App;
