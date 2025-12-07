import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/i18n.jsx';
import './Login.scss';
import userApi from '../API/UserAPI.js';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [appConfig, setAppConfig] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useI18n();

    // -------------------- LOGIN API --------------------
    const loginApi = async (email, password) => {
        try {
            const response = await userApi.login({
                email,
                password
            });

            // BE trả về: { message: "...", data: { ...userInfo } }
            if (response?.data?.data) {
                return {
                    success: true,
                    message: response.data.message,
                    user: response.data.data
                };
            }

            return {
                success: false,
                message: "Login failed (no user data)."
            };

        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message || "Login failed."
            };
        }
    };

    // -------------------- HANDLE FORM SUBMIT --------------------
const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');
    setLoading(true);

    const result = await loginApi(email, password);

    setLoading(false);

    if (result.success) {
        // Lưu user BE trả về
        localStorage.setItem('userInfo', JSON.stringify(result.user));

        // Hardcode role (sau này lấy từ BE)
        localStorage.setItem('userRole', 'students');

        // 🔥 Thông báo CHÀO MỪNG FULLNAME
        setNotice(`Chào mừng, ${result.user.fullname || 'bạn'}!`);

        // Redirect sau 1.5s cho user thấy thông báo
        setTimeout(() => navigate('/'), 1500);

    } else {
        setError(result.message);
    }
};


    // -------------------- HANDLE LOGO CLICK --------------------
    const handleLogoHome = (e) => {
        e.preventDefault();
        navigate('/');
    };

    // -------------------- GOOGLE LOGIN --------------------
    const handleGoogleLogin = () => {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || appConfig?.googleClientId || '';
        const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI || appConfig?.googleRedirectUri || 'https://localhost:7031/auth/google/callback';
        const scope = encodeURIComponent('openid email profile');
        const state = encodeURIComponent(Math.random().toString(36).slice(2));

        if (!clientId) {
            const msg = 'Missing Google Client ID. Add REACT_APP_GOOGLE_CLIENT_ID or app-config.json.';
            setError(msg);
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

        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    };

    // -------------------- LOAD APP CONFIG --------------------
    useEffect(() => {
        let cancelled = false;

        async function loadConfig() {
            try {
                const res = await fetch('/app-config.json', { cache: 'no-store' });
                if (!res.ok) return;
                const json = await res.json();
                if (!cancelled) setAppConfig(json || {});
            } catch {}
        }

        loadConfig();
        return () => { cancelled = true; };
    }, []);

    // -------------------- PARSE OAUTH CALLBACK --------------------
    useEffect(() => {
        const hash = window.location.hash || '';
        const qIndex = hash.indexOf('?');
        if (qIndex === -1) return;

        const params = new URLSearchParams(hash.substring(qIndex + 1));

        if (params.get('oauth') === 'google') {
            const status = params.get('status');
            const msg = params.get('message');

            if (status === 'success') {
                setNotice(t('login_google_success'));
                localStorage.setItem('userRole', 'students');
            } else {
                const m = msg ? decodeURIComponent(msg) : t('login_google_failed');
                setError(m);
                console.error('Google login error:', m);
            }

            navigate('/login', { replace: true });
        }
    }, []);

    // -------------------- UI --------------------
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

                <div className="social-login">
                    <button type="button" className="google-btn" onClick={handleGoogleLogin}>
                        <svg width="18" height="18" viewBox="0 0 48 48" style={{ verticalAlign: 'text-bottom', marginRight: 8 }}>
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
