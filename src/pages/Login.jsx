import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginApi = async (email, password) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    if (email === "user@ojtrag.com" && password === "password123") {
      return { success: true };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await loginApi(email, password);
    if (result.success) {
      alert("Login successful!");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-root">
      <div className="login-bg-glow top" />
      <div className="login-bg-glow bottom" />

      <div className="login-brand">FPT UNIVERSITY</div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-logo">FPT</div>
        <h2 className="login-title">OJT RAG Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <div className="login-note">Password must be at least 8 characters.</div>

        <button
          type="submit"
          disabled={loading}
          className={`login-btn ${loading ? "loading" : ""}`}
        >
          {loading ? <span className="spinner" /> : "Login"}
        </button>

        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
