import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/i18n.jsx';
import './Login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useI18n();

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

    const handleLogoHome = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className="login-container">
            <div
                className="fpt-uni-logo"
                role="button"
                tabIndex={0}
                onClick={handleLogoHome}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLogoHome(e)}
            >
                FPT UNIVERSITY
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-logo">FPT</div>
                <h2>{t('login_title')}</h2>
                <input
                    type="email"
                    placeholder={t('email')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    aria-label="Email"
                />
                <input
                    type="password"
                    placeholder={t('password_placeholder')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    aria-label="Password"
                />
                <div className="helper-text">{t('password_helper')}</div>
                <button type="submit" disabled={loading}>
                    {loading ? <span className="spinner"></span> : t('login')}
                </button>

                {error && <div className="error">{error}</div>}
                <div className="secondary-actions">
                    <button type="button" className="link-btn" onClick={() => navigate('/forgot')}>
                        {t('forgot_password')}
                    </button>
                    <button type="button" className="link-btn" onClick={() => navigate('/signup')}>
                        {t('create_account')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
