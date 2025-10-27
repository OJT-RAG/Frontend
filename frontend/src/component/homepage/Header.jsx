import React, { useState } from "react";
import { Languages, Menu, X, User, MessageSquare, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  const toggleLanguage = () => setLanguage((l) => (l === "EN" ? "VI" : "EN"));
  const iconSize = 16;

  return (
    <header className="header-root">
      <div className="header-container">
        <div className="brand">
          <div className="brand-logo">
            <MessageSquare style={{ width: iconSize, height: iconSize, color: "hsl(var(--primary-foreground))" }} />
          </div>
          <div className="brand-text">
            <h1>FPT OJT Assistant</h1>
            <small>AI-Powered Knowledge Platform</small>
          </div>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <button className="nav-btn"><BookOpen /> <span>Knowledge Base</span></button>
          <button className="nav-btn"><MessageSquare /> <span>Q&A Assistant</span></button>
          <button className="nav-btn"><User /> <span>Dashboard</span></button>
        </nav>

        <div className="actions">
          <button className="btn btn-outline" onClick={toggleLanguage} aria-label="Toggle language">
            <Languages /> <span>{language}</span>
          </button>

          <span className="badge">Student</span>

          <Link to="/login" className="login-link">
            <button className="btn btn-card"><User /> <span>Login</span></button>
          </Link>
        </div>
      </div>

      
    </header>
  );
};

export default Header;
