import React, { useState } from 'react';
import './Login.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pseudo API function
  const loginApi = async (email, password) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    setLoading(false);
    if (email === 'user@ojtrag.com' && password === 'password123') {
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await loginApi(email, password);
    if (result.success) {
      alert('Login successful!');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>OJT RAG Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
