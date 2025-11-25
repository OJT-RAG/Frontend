import React from "react";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Building2, 
  Briefcase, 
  FileText, 
  BarChart2 
} from "lucide-react";
import "./AdminSidebar.scss";

const AdminSidebar = ({ activeModule, setActiveModule }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "semesters", label: "Semesters", icon: <Calendar size={20} /> },
    { id: "users", label: "Users", icon: <Users size={20} /> },
    { id: "companies", label: "Companies", icon: <Building2 size={20} /> },
    { id: "jobs", label: "Jobs Overview", icon: <Briefcase size={20} /> },
    { id: "documents", label: "Documents", icon: <FileText size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={20} /> },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Admin Portal</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-btn ${activeModule === item.id ? "active" : ""}`}
            onClick={() => setActiveModule(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
