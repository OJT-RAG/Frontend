import React, { useState } from 'react';
import './SignUp.scss';

function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [submitting, setSubmitting] = useState(false);

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
      window.location.hash = '/';
    }, 800);
  }

  return (
    <div className="signup-container">
      <div className="fpt-uni-logo">FPT UNIVERSITY</div>
      <button type="button" className="return-top" onClick={() => { window.location.hash = '/'; }}>
        Return
      </button>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-logo">FPT</div>
        <h2>Create account</h2>

        <input name="name" placeholder="Full name" value={form.name} onChange={onChange} required aria-label="Full name" />
        <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={onChange} required aria-label="Email" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required aria-label="Password" />
        <input name="confirm" type="password" placeholder="Confirm password" value={form.confirm} onChange={onChange} required aria-label="Confirm password" />

        <div className="row">
          <button type="submit" disabled={submitting}>{submitting ? 'Creating...' : 'Create account'}</button>
        </div>
        <p className="note">By creating an account you agree to our terms.</p>
      </form>
    </div>
  );
}

export default SignUp;
