import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App as AntdApp, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { GlobalStyle } from "./components/global-style";
import SideBar from "./components/sideBar/SideBar";
import SupportButton from "./components/supportButton/SupportButton";

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
