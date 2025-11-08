import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NonTeachingLogin.module.css';
import { getExpectedPassword, validateRolePasswordFormat } from '../../auth/rolePasswords';

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  return captcha;
}

function deriveRoleFromId(idDigits) {
  // Simple heuristic mapping based on first digit of the numeric part.
  // Adjust to match your real role-mapping rules.
  const first = idDigits.charAt(0);
  switch (first) {
    case '1':
      return 'Warden';
    case '2':
      return 'Caretaker';
    case '3':
      return 'Mess Manager';
    case '4':
      return 'Accountant';
    default:
      return 'Staff';
  }
}

function NonTeachingLogin() {
  const navigate = useNavigate();
  const [ntId, setNtId] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => setCaptchaCode(generateCaptcha()), []);

  const refreshCaptcha = () => setCaptchaCode(generateCaptcha());

  const validate = () => {
    const errs = {};
    const trimmed = ntId.trim();
    const match = trimmed.match(/^NT(\d{4})$/);
    if (!match) errs.ntId = 'Invalid NT ID (expected format: NT1234)';
    if (!password || password.length < 4) errs.password = 'Password must be at least 4 characters';
    if (!captchaInput || captchaInput.toUpperCase() !== captchaCode) errs.captcha = 'Captcha does not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const digits = ntId.trim().match(/^NT(\d{4})$/)[1];
    const role = deriveRoleFromId(digits);

    // Enforce role-specific password format and value
    const format = validateRolePasswordFormat(role, password);
    if (!format.ok) {
      setErrors({ ...errors, password: 'Password format invalid: ' + format.description });
      return;
    }

    const expected = getExpectedPassword(role) || getExpectedPassword('Staff');
    if (expected && password !== expected) {
      setErrors({ ...errors, password: 'Incorrect password for role: ' + role });
      return;
    }

    // Persist minimal info and navigate to dashboard.
    localStorage.setItem('ntId', ntId.trim());
    localStorage.setItem('ntRole', role);

    // In a real app you'd call your authentication API here and handle errors.
    navigate('/non-teaching-dashboard');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.loginForm} noValidate>
        <h2 className={styles.title}>Non-Teaching Login</h2>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="ntId">NT ID</label>
          <input
            id="ntId"
            className={styles.input}
            value={ntId}
            onChange={(e) => setNtId(e.target.value)}
            placeholder="NT1234"
            autoComplete="username"
          />
          {errors.ntId && <div className={styles.error}>{errors.ntId}</div>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            autoComplete="current-password"
          />
          {errors.password && <div className={styles.error}>{errors.password}</div>}
        </div>

        <div className={styles.captchaRow}>
          <div className={styles.captchaBox} aria-hidden>
            {captchaCode}
          </div>
          <button type="button" className={styles.refreshButton} onClick={refreshCaptcha} aria-label="Refresh captcha">↻</button>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="captcha">Enter Captcha</label>
          <input
            id="captcha"
            className={styles.input}
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            placeholder="Enter the text shown above"
          />
          {errors.captcha && <div className={styles.error}>{errors.captcha}</div>}
        </div>

        <button type="submit" className={styles.submitButton}>Login</button>
      </form>
    </div>
  );
}

export default NonTeachingLogin;