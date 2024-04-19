import { Layout } from "antd";
import React from "react";
import Sidebar from "../Components/Menu";
import Headers from "../Components/Header";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const HomePage: React.FC = () => (
  <Layout className="h-[100vh]">
    <Sider width={250} className="h-[100vh]">
      <Sidebar />
    </Sider>
    <Layout className="h-[100vh]">
      <Header className="bg-white">
        <Headers />
      </Header>
      <Content className="bg-white">
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

export default HomePage;
