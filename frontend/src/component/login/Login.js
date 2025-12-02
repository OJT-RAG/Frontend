import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/i18n.jsx';
import './Login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [appConfig, setAppConfig] = useState(null);
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
            
             localStorage.setItem('userRole', 'students');

        // 👉 Chuyển hướng về homepage
        navigate('/');
        } else {
            setError(result.message);
        }
    };

    const handleLogoHome = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const handleGoogleLogin = () => {
        // Build Google OAuth URL directly (Authorization Code flow)
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || appConfig?.googleClientId || '';
        const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI || appConfig?.googleRedirectUri || 'https://localhost:7031/auth/google/callback';
        const scope = encodeURIComponent('openid email profile');
        const state = encodeURIComponent(Math.random().toString(36).slice(2));

        if (!clientId) {
            const msg = 'Missing Google Client ID. Set REACT_APP_GOOGLE_CLIENT_ID or public/app-config.json: { "googleClientId": "..." }';
            // Show inline error and log to console instead of alert
            setError(msg);
            // eslint-disable-next-line no-console
            console.error(msg);
            return;
        }

        const params = [
            `client_id=${encodeURIComponent(clientId)}`,
            `redirect_uri=${encodeURIComponent(redirectUri)}`,
            'response_type=code',
            `scope=${scope}`,
            'access_type=offline',
            'include_granted_scopes=true',
            'prompt=consent',
            `state=${state}`,
        ].join('&');

        const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
        try {
            window.location.href = url;
        } catch (e) {
            const msg = 'Redirect to Google OAuth failed';
            setError(`${msg}. Check console for details.`);
            // eslint-disable-next-line no-console
            console.error(msg + ':', e);
        }
    };

    // Try load runtime app-config.json so we don't require rebuild for secrets
    useEffect(() => {
        let cancelled = false;
        async function loadConfig() {
            try {
                const res = await fetch('/app-config.json', { cache: 'no-store' });
                if (!res.ok) return;
                const json = await res.json();
                if (!cancelled) setAppConfig(json || {});
            } catch (e) {
                // optional silent fail
            }
        }
        loadConfig();
        return () => { cancelled = true; };
    }, []);

    // Parse OAuth results sent back to this page (e.g. #/login?oauth=google&status=success|error&message=...)
    useEffect(() => {
        const hash = window.location.hash || '';
        const qIndex = hash.indexOf('?');
        if (qIndex === -1) return;
        const query = hash.substring(qIndex + 1);
        const params = new URLSearchParams(query);
        const provider = params.get('oauth');
        const status = params.get('status');
        const msg = params.get('message');
        if (provider === 'google') {
            if (status === 'success') {
                setNotice(t('login_google_success'));
                // Optionally mark session
                localStorage.setItem('userRole', 'students');
            } else if (status === 'error') {
                const m = msg ? decodeURIComponent(msg) : t('login_google_failed');
                setError(m);
                // eslint-disable-next-line no-console
                console.error('Google login error:', m);
            }
            // Clean the URL so it doesn't re-trigger
            navigate('/login', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

                <div className="social-login" aria-label="social-login">
                    <button type="button" className="google-btn" onClick={handleGoogleLogin} aria-label={t('login_with_google')}>
                        {/* Simple Google G SVG */}
                        <svg width="18" height="18" viewBox="0 0 48 48" style={{ verticalAlign: 'text-bottom', marginRight: 8 }} aria-hidden="true">
                            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 6 .9 8.3 3l5.7-5.7C34.5 6.3 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10.4 0 19-7.5 19-20 0-1.2-.1-2.3-.4-3.5z"/>
                            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.2 19 14 24 14c3.1 0 6 .9 8.3 3l5.7-5.7C34.5 6.3 29.5 4 24 4 15.7 4 8.6 8.5 6.3 14.7z"/>
                            <path fill="#4CAF50" d="M24 44c5.1 0 9.8-1.9 13.3-5.1l-6.1-5c-2 1.4-4.6 2.1-7.2 2.1-5.2 0-9.6-3.1-11.3-7.5l-6.5 5C8.5 39.5 15.7 44 24 44z"/>
                            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.6-4.6 6-8.3 6-5.2 0-9.6-3.1-11.3-7.5l-6.5 5C11.5 39.5 18.7 44 24 44c10.4 0 19-7.5 19-20 0-1.2-.1-2.3-.4-3.5z"/>
                        </svg>
                        {t('login_with_google')}
                    </button>
                </div>

                {error && <div className="error">{error}</div>}
                {notice && <div className="success">{notice}</div>}
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
