import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CV.scss';
import fptBadge from '../assets/fpt.png';
import { useI18n } from '../../i18n/i18n.jsx';

function CV({ student }) {
  const navigate = useNavigate();
  const { t } = useI18n();

  const data = student || {
    name: 'Nguyen Van A',
    major: 'Software Engineering',
    studentNumber: 'SE123456',
    dob: '2003-05-20',
    currentSemester: 'Fall 2025',
    joinSemester: 'Fall 2021',
    expectedGraduate: 'Spring 2026',
    avatarUrl: null,
  };

  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  };

  const handleLogoHome = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="cv-page">
      {/* animated background layer */}
      <div className="cv-anim-bg" aria-hidden="true">
        <span className="orb o1" />
        <span className="orb o2" />
        <span className="orb o3" />
        <span className="orb o4" />
        <span className="orb o5" />
      </div>

      {/* top-right brand image */}
      <img
        className="brand-top-right"
        src={fptBadge}
        alt="FPT University"
        aria-hidden="false"
      />

      <div
        className="fpt-uni-logo"
        role="button"
        tabIndex={0}
        onClick={handleLogoHome}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLogoHome(e)}
      >
        FPT UNIVERSITY
      </div>

      <div className="cv-card">
        <div className="cv-header">
          <h1>{t('cv_title')}</h1>
          <div className="cv-actions">
            <button type="button" className="btn secondary" onClick={() => navigate('/')}>{t('home')}</button>
            <button type="button" className="btn primary">{t('edit_profile')}</button>
          </div>
        </div>

        <div className="cv-content">
          <div className="cv-avatar">
            {data.avatarUrl ? (
              <img src={data.avatarUrl} alt={`${data.name} avatar`} />
            ) : (
              <div className="avatar-fallback" aria-label="Avatar placeholder">
                {getInitials(data.name)}
              </div>
            )}
          </div>

          <div className="cv-info">
            <div className="info-grid">
              <div className="info-item">
                <div className="label">{t('name')}</div>
                <div className="value">{data.name}</div>
              </div>
              <div className="info-item">
                <div className="label">{t('major')}</div>
                <div className="value">{data.major}</div>
              </div>
              <div className="info-item">
                <div className="label">{t('student_number')}</div>
                <div className="value">{data.studentNumber}</div>
              </div>
              <div className="info-item">
                <div className="label">{t('date_of_birth')}</div>
                <div className="value">{data.dob}</div>
              </div>
              <div className="info-item">
                <div className="label">{t('current_semester')}</div>
                <div className="value">{data.currentSemester}</div>
              </div>
              <div className="info-item">
                <div className="label">{t('join_in')}</div>
                <div className="value">{data.joinSemester}</div>
              </div>
              <div className="info-item">
                <div className="label">{t('expected_graduate')}</div>
                <div className="value">{data.expectedGraduate}</div>
              </div>
            </div>

            <div className="cv-footer">
              <button type="button" className="btn ghost" onClick={() => window.print()}>{t('download_print')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CV;
