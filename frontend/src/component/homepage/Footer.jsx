import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-top">
          <h3 className="footer-title">FPT OJT Assistant</h3>
          <p className="footer-sub">Empowering students with AI-driven knowledge access</p>
        </div>

        <div className="footer-divider" />

        <div className="footer-copy">© {new Date().getFullYear()} FPT University. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
