import React from "react";
import Header from "../../homepage/Header";
import Sidebar from "./Sidebar";
import ChatPanel from "./ChatPanel";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-root">
      <Header />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
