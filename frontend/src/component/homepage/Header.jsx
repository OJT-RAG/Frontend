import React, { useState, useEffect } from "react";
import { Languages, User, MessageSquare, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/i18n.jsx";
import "./Header.css";

const Header = () => {
 
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("userRole") || "guest");
  const { lang, setLang, t } = useI18n();
  const languageCode = (lang || "en").toUpperCase().slice(0, 2);
  const iconSize = 16;

  // Cập nhật khi login/logout thay đổi localStorage
  useEffect(() => {
    const handleStorage = () => {
      setRole(localStorage.getItem("userRole") || "guest");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <header className="header-root">
      <div className="header-container">
        <div className="brand">
          <div className="brand-logo">
            <MessageSquare
              style={{
                width: iconSize,
                height: iconSize,
                color: "hsl(var(--primary-foreground))",
              }}
            />
          </div>
          <div className="brand-text">
            <h1>{t("appName")}</h1>
            <small>{t("appTagline")}</small>
          </div>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <button className="nav-btn">
            <BookOpen /> <span>{t("nav_knowledge")}</span>
          </button>
          <button className="nav-btn">
            <MessageSquare /> <span>{t("nav_qa")}</span>
          </button>
          <Link to='/dashboard' className="nav-btn">
            <User /> <span>{t("nav_dashboard")}</span>
          </Link>
        </nav>

        <div className="actions">
          {/* Ngôn ngữ */}
          <div className="lang">
            <button
              className="btn btn-outline lang-trigger"
              onClick={() => setIsLangOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={isLangOpen}
              aria-label={t("language")}
            >
              <Languages /> <span>{languageCode}</span>
            </button>
            {isLangOpen && (
              <div className="lang-menu" role="menu">
                <button
                  className="lang-item"
                  role="menuitem"
                  onClick={() => {
                    setLang("en");
                    setIsLangOpen(false);
                  }}
                >
                  🇬🇧 {t("lang_en")}
                </button>
                <button
                  className="lang-item"
                  role="menuitem"
                  onClick={() => {
                    setLang("vi");
                    setIsLangOpen(false);
                  }}
                >
                  🇻🇳 {t("lang_vi")}
                </button>
                <button
                  className="lang-item"
                  role="menuitem"
                  onClick={() => {
                    setLang("ja");
                    setIsLangOpen(false);
                  }}
                >
                  🇯🇵 {t("lang_ja")}
                </button>
              </div>
            )}
          </div>

          {/* Badge */}
          <span className="badge">
            {role === "students" ? "Student" : "Guest"}
          </span>

          {/* Nút login/logout */}
          {role === "students" ? (
            <button
              className="btn btn-card"
              onClick={() => {
                localStorage.removeItem("userRole");
                setRole("guest");
              }}
            >
              <User /> <span>{t("logout")}</span>
            </button>
          ) : (
            <Link to="/login" className="login-link">
              <button className="btn btn-card">
                <User /> <span>{t("login")}</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
