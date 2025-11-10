import React from "react";
import Sidebar from "./Sidebar";
import ChatPanel from "./ChatPanel";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-root">
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
