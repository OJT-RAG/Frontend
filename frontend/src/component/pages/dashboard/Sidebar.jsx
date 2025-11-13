import React from "react";
import { MessageSquare, Settings, FileText } from "lucide-react"; // Import FileText icon
import "./Sidebar.css";

// Truyền props 'activeModule' và 'setActiveModule' từ Dashboard vào
const Sidebar = ({ activeModule, setActiveModule }) => { 
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Modules</h2>
      
      {/* Nút Chat AI */}
      <button
        className={`sidebar-btn ${activeModule === "chat" ? "active" : ""}`}
        onClick={() => setActiveModule("chat")}
      >
        <MessageSquare /> Chat AI
      </button>

      {/* Nút Quản lý PDF MỚI */}
      <button
        className={`sidebar-btn ${activeModule === "pdf" ? "active" : ""}`}
        onClick={() => setActiveModule("pdf")}
      >
        <FileText /> Quản lý PDF
      </button>

      {/* Nút Cài đặt (giữ nguyên) */}
      <button
        className={`sidebar-btn ${activeModule === "settings" ? "active" : ""}`}
        onClick={() => setActiveModule("settings")}
        disabled
      >
        <Settings /> Cài đặt (Sắp ra mắt)
      </button>
    </aside>
  );
};

export default Sidebar;