import React from "react";
import "./Footer.css";
import { useI18n } from "../../i18n/i18n.jsx";

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-top">
          <h3 className="footer-title">{t('appName')}</h3>
          <p className="footer-sub">{t('footer_sub')}</p>
        </div>

        <div className="footer-divider" />

        <div className="footer-copy">© {new Date().getFullYear()} FPT University. {t('rights_reserved')}</div>
      </div>
    </footer>
  );
};

export default Footer;
