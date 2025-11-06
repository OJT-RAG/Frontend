import React, { useState } from "react";
import { MessageSquare, Settings } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const [active, setActive] = useState("chat");

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Modules</h2>
      <button
        className={`sidebar-btn ${active === "chat" ? "active" : ""}`}
        onClick={() => setActive("chat")}
      >
        <MessageSquare /> Chat AI
      </button>

      <button
        className={`sidebar-btn ${active === "settings" ? "active" : ""}`}
        onClick={() => setActive("settings")}
        disabled
      >
        <Settings /> (Coming Soon)
      </button>
    </aside>
  );
};

export default Sidebar;
