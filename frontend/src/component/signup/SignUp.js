import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/i18n.jsx';
import './SignUp.scss';

function SignUp() {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
    confirm: '',
    studentCode: '',
    phone: '',
    dob: '',
    majorId: '',
    companyId: '',
    avatarUrl: '',
    cvUrl: '',
  });
  const [majors, setMajors] = useState([]);
  const [majorsLoading, setMajorsLoading] = useState(false);
  const [majorsError, setMajorsError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const loadMajors = async () => {
    let cancelled = false;
    setMajorsError('');
    setMajorsLoading(true);
    const endpoint = process.env.REACT_APP_MAJOR_GETALL || '/api/Major/getAll';
    const base = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:5220').replace(/\/$/, '');
    const url = `${base}${endpoint}`;
    try {
      const res = await fetch(url, { headers: { accept: 'application/json' } });
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) {
        const text = await res.text().catch(() => '');
        throw new Error(`Non-JSON (${ct || 'unknown'}) @ ${url} :: ${text.slice(0,180)}`);
      }
      const json = await res.json();
      if (!res.ok) {
        const msg = json && json.message ? ` - ${json.message}` : '';
        throw new Error(`HTTP ${res.status}${msg} @ ${url}`);
      }
      const list = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
      const normalized = list
        .map((m) => {
          const id = m?.majorId ?? m?.MajorId ?? m?.Major_ID ?? m?.id ?? m?.Id;
          const title = m?.majorTitle ?? m?.Major_Title ?? m?.majorName ?? m?.MajorName ?? m?.Name ?? m?.name;
          const code = m?.majorCode ?? m?.MajorCode ?? m?.code ?? m?.Code;
          if (id == null) return null;
          return { id: String(id), name: title ? (code ? `${title} (${code})` : title) : String(id) };
        })
        .filter(Boolean);
      if (!cancelled) setMajors(normalized);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to load majors', e);
      setMajorsError(e?.message || 'Failed to load majors');
      if (!cancelled) setMajors([]);
    } finally {
      if (!cancelled) setMajorsLoading(false);
    }
    return () => { cancelled = true; };
  };

  useEffect(() => {
    loadMajors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert(t('error_password_mismatch'));
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        MajorId: form.majorId ? Number(form.majorId) : null,
        CompanyId: form.companyId ? Number(form.companyId) : null,
        Email: form.email || null,
        Password: form.password || null,
        Fullname: form.fullname || null,
        StudentCode: form.studentCode || null,
        Dob: form.dob || null, // expects YYYY-MM-DD
        Phone: form.phone || null,
        AvatarUrl: form.avatarUrl || null,
        CvUrl: form.cvUrl || null,
      };

      const base = process.env.REACT_APP_API_BASE_URL || '';
      const endpoint = process.env.REACT_APP_SIGNUP_ENDPOINT || '/api/user/create';
      const url = `${base}`.replace(/\/$/, '') + `${endpoint}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = json && json.message ? json.message : `${t('signup_submit_error')} (HTTP ${res.status})`;
        throw new Error(msg);
      }

      alert((json && json.message) || t('signup_submit_success'));
      navigate('/login', { replace: true });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Signup failed:', err);
      alert(err.message || t('signup_submit_error'));
    } finally {
      setSubmitting(false);
    }
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

        <input name="fullname" placeholder={t('full_name')} value={form.fullname} onChange={onChange} required aria-label={t('full_name')} />
        <input name="email" type="email" placeholder={t('email_placeholder')} value={form.email} onChange={onChange} required aria-label="Email" />
        <input name="password" type="password" placeholder={t('password')} value={form.password} onChange={onChange} required aria-label={t('password')} />
        <input name="confirm" type="password" placeholder={t('confirm_password')} value={form.confirm} onChange={onChange} required aria-label={t('confirm_password')} />

        <input name="studentCode" placeholder={t('student_number')} value={form.studentCode} onChange={onChange} aria-label={t('student_number')} />
        <input name="phone" placeholder={t('phone')} value={form.phone} onChange={onChange} aria-label={t('phone')} />
        <input name="dob" type="date" placeholder={t('date_of_birth')} value={form.dob} onChange={onChange} aria-label={t('date_of_birth')} />

        <select name="majorId" value={form.majorId} onChange={onChange} aria-label={t('major')} required>
          <option value="" disabled>{majorsLoading ? t('loading') : t('select_major')}</option>
          {majors.map((m, idx) => {
            const id = (m && typeof m === 'object') ? m.id : (m != null ? String(m) : String(idx));
            const label = (m && typeof m === 'object') ? (m.name || id) : (m != null ? String(m) : id);
            return (
              <option key={`${id}-${idx}`} value={id}>{label}</option>
            );
          })}
          {!majorsLoading && majors.length === 0 && (
            <option value="" disabled>({t('no_majors_found')})</option>
          )}
        </select>
        {majorsError && (
          <div style={{ fontSize: '12px', color: '#b94a48', marginTop: '6px' }}>
            {majorsError}
            <button type="button" onClick={loadMajors} style={{ marginLeft: 8 }} disabled={majorsLoading}>
              {majorsLoading ? t('loading') : 'Reload Majors'}
            </button>
          </div>
        )}
        <input name="companyId" type="number" placeholder={t('company')} value={form.companyId} onChange={onChange} aria-label={t('company')} />

        <input name="avatarUrl" placeholder={t('avatar_url')} value={form.avatarUrl} onChange={onChange} aria-label={t('avatar_url')} />
        <input name="cvUrl" placeholder={t('cv_url')} value={form.cvUrl} onChange={onChange} aria-label={t('cv_url')} />

        <div className="row">
          <button type="submit" disabled={submitting}>{submitting ? t('creating') : t('create_account_btn')}</button>
        </div>
        <p className="note">{t('terms_note')}</p>
      </form>
    </div>
  );
}

export default SignUp;
