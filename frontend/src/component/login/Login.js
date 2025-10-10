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
            // Show success toast
            alert('Login successful!');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-container">
            <div className="fpt-uni-logo">FPT UNIVERSITY</div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-logo">FPT</div>
                <h2>OJT RAG Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    aria-label="Email"
                />
                <input
                    type="password"
                    placeholder="Password (min 8 chars)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    aria-label="Password"
                />
                <div className="helper-text">Password must be at least 8 characters.</div>
                <button type="submit" disabled={loading}>
                    {loading ? <span className="spinner"></span> : 'Login'}
                </button>

                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default Login;
