import React, { useState } from "react";
import { Languages, Menu, X, User, MessageSquare, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/i18n.jsx";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const languageCode = (lang || 'en').toUpperCase().slice(0,2);
  const iconSize = 16;

  return (
    <header className="header-root">
      <div className="header-container">
        <div className="brand">
          <div className="brand-logo">
            <MessageSquare style={{ width: iconSize, height: iconSize, color: "hsl(var(--primary-foreground))" }} />
          </div>
          <div className="brand-text">
            <h1>{t('appName')}</h1>
            <small>{t('appTagline')}</small>
          </div>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <button className="nav-btn"><BookOpen /> <span>{t('nav_knowledge')}</span></button>
          <button className="nav-btn"><MessageSquare /> <span>{t('nav_qa')}</span></button>
          <button className="nav-btn"><User /> <span>{t('nav_dashboard')}</span></button>
        </nav>

        <div className="actions">
          <div className="lang">
            <button
              className="btn btn-outline lang-trigger"
              onClick={() => setIsLangOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={isLangOpen}
              aria-label={t('language')}
            >
              <Languages /> <span>{languageCode}</span>
            </button>
            {isLangOpen && (
              <div className="lang-menu" role="menu">
                <button className="lang-item" role="menuitem" onClick={() => { setLang('en'); setIsLangOpen(false); }}>🇬🇧 {t('lang_en')}</button>
                <button className="lang-item" role="menuitem" onClick={() => { setLang('vi'); setIsLangOpen(false); }}>🇻🇳 {t('lang_vi')}</button>
                <button className="lang-item" role="menuitem" onClick={() => { setLang('ja'); setIsLangOpen(false); }}>🇯🇵 {t('lang_ja')}</button>
              </div>
            )}
          </div>

          <span className="badge">Student</span>

          <Link to="/login" className="login-link">
            <button className="btn btn-card"><User /> <span>{t('login')}</span></button>
          </Link>
        </div>
      </div>

      
    </header>
  );
};

export default Header;
