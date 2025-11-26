import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./CompanySidebar";
import CompanyRepDashboard from "./Dashboard/CompanyDashboard";

const { Sider, Content } = Layout;

const CompanyRepLayout = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      
      <Sider width={280} style={{ background: "transparent" }}>
        <Sidebar 
          activeModule={activeModule}
          setActiveModule={setActiveModule}
        />
      </Sider>

      <div style={{ flex: 1, padding: "20px" }}>
        {activeModule === "dashboard" && <CompanyRepDashboard />}
        {activeModule === "jobs" && <div>Job Management Page</div>}
        {activeModule === "applicants" && <div>Applicants Page</div>}
        {activeModule === "documents" && <div>Company Documents Page</div>}
        {activeModule === "students" && <div>Students OJT Page</div>}
        {activeModule === "final_report" && <div>Final Report Page</div>}
        {activeModule === "profile" && <div>Profile Page</div>}
      </div>

    </Layout>
  );
};

export default CompanyRepLayout;
