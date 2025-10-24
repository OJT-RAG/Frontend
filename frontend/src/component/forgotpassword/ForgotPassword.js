import React, { useState } from 'react';
import './ForgotPassword.scss';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      // eslint-disable-next-line no-console
      console.log('Password reset requested for', email);
      alert('If that email exists we sent a reset link.');
      // navigate back to login
      window.location.hash = '/';
    }, 700);
  }

  return (
    <div className="forgot-container">
      <div className="fpt-uni-logo">FPT UNIVERSITY</div>
      <button type="button" className="return-top" onClick={() => { window.location.hash = '/'; }}>
        Return
      </button>
      <form className="forgot-form" onSubmit={handleSubmit}>
        <div className="forgot-logo">FPT</div>
        <h2>Forgot password</h2>
        <p>Enter your account email and we'll send a password reset link.</p>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email"
        />

        <div className="actions">
          <a className="back-link" href="#/">Back to login</a>
          <button type="submit" disabled={submitting || !email}>
            {submitting ? 'Sending...' : 'Send reset link'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
