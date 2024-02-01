import { useEffect, useState } from "react";
import { Button, Result, Layout, Menu } from "antd";
import "../styling/AdminPanel.css";
import {
  DashboardOutlined,
  ShoppingOutlined,
  CalendarOutlined,
  BankOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useLoginContext } from "../context/LoginContext";
import React from "react";
import AdminDashboard from "../components/AdminDashboard";
import AdminEvents from "../components/AdminEvents";
import AdminFacilities from "../components/AdminFacilities";
import AdminOrders from "../components/AdminOrders";

function AdminPanel() {
  // Destructure Layout components from antd
  const { Header, Content, Footer, Sider } = Layout;
  // Define menu items for navigation
  const MenuItems = ["Dashboard", "Events", "Facilities", "Orders"];

  const { loggedInAdmin, logoutAdmin, authorizeAdmin } = useLoginContext();
  // State to manage selected tab in the menu
  const [selectedTab, setSelectedTab] = useState("1");

  // Define menu items with icons for the Sider (sidebar)
  const items: MenuProps["items"] = [
    DashboardOutlined,
    CalendarOutlined,
    BankOutlined,
    ShoppingOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: MenuItems[index],
    onClick: () => handleMenuClick(MenuItems[index]),
  }));

  // Authorize admin on component mount
  useEffect(() => {
    authorizeAdmin();
  }, []);

  // Function to handle menu item clicks
  const handleMenuClick = (key: string) => {
    setSelectedTab(key);
  };

  // If not logged in, show a message saying the user is not authorized
  if (!loggedInAdmin) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Du är inte behörig till denna sida. Logga in för att fortsätta."
        extra={
          <Button href="/login" type="primary">
            Logga in
          </Button>
        }
      />
    );
  }

  // Function to handle logout click
  const handleLogoutClick = () => {
    logoutAdmin();
    window.location.href = "/login";
  };

  return (
    <Layout>
      <Header style={{ padding: 0, background: "#001529" }}>
        <h1>Adminpanel</h1>
        <div>
          <p>Inloggad som {loggedInAdmin?.firstName}</p>
        </div>
      </Header>
      <Layout>
        <Sider>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            selectedKeys={[selectedTab]}
            onClick={({ key }) => handleMenuClick(key.toString())}
            items={items}
          />

          <Button
            type="primary"
            className="logoutBtn"
            onClick={handleLogoutClick}
          >
            Logga ut
          </Button>
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: "#fff",
                borderRadius: "8px",
              }}
            >
              {/* Render the appropriate component based on the selected tab */}
              {selectedTab === "1" && <AdminDashboard />}
              {selectedTab === "2" && <AdminEvents />}
              {selectedTab === "3" && <AdminFacilities />}
              {selectedTab === "4" && <AdminOrders />}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Sörbygden Jämtland ©{new Date().getFullYear()} Created by Cajolina
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AdminPanel;
