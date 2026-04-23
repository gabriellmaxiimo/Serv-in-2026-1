import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { App as AntdApp, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { GlobalStyle } from "./components/global-style";
import SideBar from "./components/sideBar/SideBar";
import SupportButton from "./components/supportButton/SupportButton";
import LoginPage from "./pages/login/LoginPage";
import CreateEmployeePage from "./pages/employees/CreateEmployeePage";
import ListEmployeesPage from "./pages/employees/ListEmployeesPage";
import CreateEventPage from "./pages/events/CreateEventPage";
import ListEventPage from "./pages/events/ListEventPage";
import FirstAccessPage from "./pages/firstAccess/FirstAccessPage";

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <SideBar />
    <Layout>
      <Content style={{ background: "#fff" }}>
        {children}
      </Content>
    </Layout>
  </Layout>
);

function App() {
  return (
    <AntdApp>
      <GlobalStyle />
      <SupportButton />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/first-access" element={<FirstAccessPage />} />

          <Route path="/*" element={
            <MainLayout>
              <Routes>
                <Route path="/events" element={<ListEventPage />} />
                <Route path="/events/create" element={<CreateEventPage />} />
                <Route path="/employees" element={<ListEmployeesPage />} />
                <Route path="/employees/create" element={<CreateEmployeePage />} />
                
                <Route path="/" element={<Navigate to="/login" />} />
              </Routes>
            </MainLayout>
          } />
        </Routes>
      </BrowserRouter>
    </AntdApp>
  );
}

export default App;