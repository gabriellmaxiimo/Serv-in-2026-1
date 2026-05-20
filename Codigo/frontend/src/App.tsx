import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { GlobalStyle } from "./components/global-style";
import LoginPage from "./pages/login/LoginPage";
import CreateEmployeePage from "./pages/employees/CreateEmployeePage";
import ListEmployeesPage from "./pages/employees/ListEmployeesPage";
import { App as AntdApp, Layout , ConfigProvider} from "antd";
import TopBar from "./components/topBar/TopBar";
import NavBar from "./components/navBar/NavBar";
import SupportButton from "./components/common/supportButton/SupportButton";
import CreateEventPage from "./pages/events/CreateEventPage";
import ListEventPage from "./pages/events/ListEventPage";
import FirstAccessPage from "./pages/firstAccess/FirstAccessPage";
import ListProfessionalsPage from "./pages/professional/ListProfessionalsPage";
import CreateProfessionalPage from "./pages/professional/CreateProfessionalPage";
import ProfessionalDetailPage from "./pages/professional/ProfessionalDetailPage";
import EventDetailsPage from "./pages/events/EventDetailsPage";
import DashboardGeral from "./pages/dashboard/DashboardGeral";

function App() {
  return (
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
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/first-access" element={<FirstAccessPage />} />

                  <Route path="/events" element={<ListEventPage />} />
                  <Route path="/events/create" element={<CreateEventPage />} />
                  <Route path="/events/:id" element={<EventDetailsPage />} />

                  <Route path="/employees" element={<ListEmployeesPage />} />
                  <Route path="/employees/create" element={<CreateEmployeePage />} />

                  <Route path="/professionals" element={<ListProfessionalsPage />} />
                  <Route path="/professional/create" element={<CreateProfessionalPage />} />
                  <Route path="/professional/:id" element={<ProfessionalDetailPage />} />

                  <Route path="/metrics" element={<DashboardGeral />} />
                  <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      </AntdApp>
      </ConfigProvider>
  );
}

export default App;