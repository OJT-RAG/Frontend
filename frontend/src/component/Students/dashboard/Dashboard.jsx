import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import ChatPanel from "./ChatPanel.jsx";
import PdfManager from "../../pages/pdf/pdfManager.jsx";
import FinalReportPage from "../StudentsReport/FinalReportPage.jsx";
import "./Dashboard.css";
import UpdateUserPage from "../userProfile/UpdateUserPage.jsx";

const Dashboard = () => {
  // 👈 Thêm state để theo dõi module đang hoạt động
  const [activeModule, setActiveModule] = useState("chat"); 

  // Hàm render nội dung tương ứng
  const renderContent = () => {
    switch (activeModule) {
      case "chat":
        return <ChatPanel />;
      case "pdf":
        return <PdfManager />; // 👈 Hiển thị PdfManager
      case "finalreport":
        return <FinalReportPage />; // 👈 Hiển thị PdfManager  
      case "updateuser":
        return <UpdateUserPage/>; 
      case "settings":
        return <div>Nội dung Cài đặt sẽ ở đây...</div>; // Tạm thời
      default:
        return <ChatPanel />;
    }
  };

  return (
    <div className="dashboard-root">
      <div className="dashboard-container">
        {/* 👈 Truyền state và hàm set state vào Sidebar */}
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <div className="dashboard-content">
          {/* 👈 Gọi hàm để render nội dung động */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;