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
import EditEventPage from "./pages/events/EditEventPage";
import ListEventPage from "./pages/events/ListEventPage";
import FirstAccessPage from "./pages/firstAccess/FirstAccessPage";
import ListProfessionalsPage from "./pages/professional/ListProfessionalsPage";
import CreateProfessionalPage from "./pages/professional/CreateProfessionalPage";
import EditProfessionalPage from "./pages/professional/EditProfessionalPage";
import ProfessionalDetailPage from "./pages/professional/ProfessionalDetailPage";
import EventDetailsPage from "./pages/events/EventDetailsPage";
import DashboardGeral from "./pages/dashboard/DashboardGeral";
import InviteResponsePage from "./pages/invites/InviteResponsePage";
import InviteNotificationBanner from "./components/common/globalNotification/InviteNotificationBanner";
import { isAdmin } from "./functions/userIsAdmin";
import CredentialEventPage from "./pages/events/CredentialEventPage";

function App() {

  const isAdminUser = isAdmin();

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
        <InviteNotificationBanner />

        <BrowserRouter>
          <Layout style={{ minHeight: "100vh" }}>
            <TopBar />
            <NavBar />
            <Layout>
              <Content style={{ background: "#fff" }}>
                <Routes>
                  {isAdminUser && (
                    <>
                      <Route path="/events/create" element={<CreateEventPage />} />
                      <Route path="/events/:id/edit" element={<EditEventPage />} />
                      <Route path="/employees/create" element={<CreateEmployeePage />} />
                      <Route path="/professional/create" element={<CreateProfessionalPage />} />
                      <Route path="/metrics" element={<DashboardGeral />} />
                      
                    </>
                  )}
                  
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/first-access" element={<FirstAccessPage />} />

                  <Route path="/events" element={<ListEventPage />} />

                  <Route path="/employees" element={<ListEmployeesPage />} />          

                  <Route path="/professionals" element={<ListProfessionalsPage />} />
                  <Route path="/professional/:id/edit" element={<EditProfessionalPage />} />
                  <Route path="/professional/:id" element={<ProfessionalDetailPage />} />

                  <Route path="/invites/:token" element={<InviteResponsePage />} />
                  <Route path="/events/:id" element={<EventDetailsPage />} />
                  <Route path="/events/:id/credential" element={<CredentialEventPage />} />
                  
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