import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/i18n.jsx';
import './SignUp.scss';

function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert('Passwords do not match');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      // eslint-disable-next-line no-console
      console.log('Signing up', form);
      alert('Account created (demo).');
      // After successful signup, send user to Login
      navigate('/login', { replace: true });
    }, 800);
  }

  const handleReturn = () => {
    navigate('/login'); // use { replace: true } if you don't want users to go back
  };

  const handleLogoHome = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div
        className="fpt-uni-logo"
        role="button"
        tabIndex={0}
        onClick={handleLogoHome}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLogoHome(e)}
      >
        FPT UNIVERSITY
      </div>
      <button type="button" className="return-top" onClick={handleReturn}>
        {t('return')}
      </button>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-logo">FPT</div>
        <h2>{t('signup_title')}</h2>

        <input name="name" placeholder={t('full_name')} value={form.name} onChange={onChange} required aria-label={t('full_name')} />
        <input name="email" type="email" placeholder={t('email_placeholder')} value={form.email} onChange={onChange} required aria-label="Email" />
        <input name="password" type="password" placeholder={t('password')} value={form.password} onChange={onChange} required aria-label={t('password')} />
        <input name="confirm" type="password" placeholder={t('confirm_password')} value={form.confirm} onChange={onChange} required aria-label={t('confirm_password')} />

        <div className="row">
          <button type="submit" disabled={submitting}>{submitting ? t('creating') : t('create_account_btn')}</button>
        </div>
        <p className="note">{t('terms_note')}</p>
      </form>
    </div>
  );
}

export default SignUp;
