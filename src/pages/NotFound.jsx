import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="nf-root">
      <div className="nf-center">
        <h1 className="nf-code">404</h1>
        <p className="nf-msg">Oops! Page not found</p>
        <a href="/" className="nf-link">Return to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
