import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FacultyLogin.module.css';
import { validateRolePasswordFormat, getExpectedPassword } from '../../auth/rolePasswords';
import stylesFromNT from '../NonTeachingLogin/NonTeachingLogin.module.css';

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  return captcha;
}

export default function FacultyLogin() {
  const navigate = useNavigate();
  const [facultyId, setFacultyId] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCaptchaCode(generateCaptcha());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (captchaInput !== captchaCode) {
      alert('Captcha does not match. Try again.');
      setCaptchaCode(generateCaptcha());
      setCaptchaInput('');
      return;
    }

    // TODO: Replace with real authentication API call.
    // For now, accept any non-empty facultyId/password as success.
    const errs = {};
    if (!facultyId) errs.facultyId = 'Please enter Faculty ID.';

    // Validate format policy first
    const format = validateRolePasswordFormat('Faculty', password);
    if (!format.ok) errs.password = `Password format invalid: ${format.description}`;

    const expected = getExpectedPassword('Faculty');
    if (expected && password !== expected) errs.password = 'Incorrect password for Faculty.';

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    localStorage.setItem('facultyId', facultyId);
    navigate('/faculty-dashboard');
  };

  return (
    <div className={styles.body}>
      <div className={styles.loginBox}>
        <h2>Faculty Login</h2>
        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          <input
            type="text"
            id="facultyId"
            placeholder="Faculty ID Number"
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            required
          />
          {errors.facultyId && <div className={stylesFromNT.error}>{errors.facultyId}</div>}
          <br />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <div className={stylesFromNT.error}>{errors.password}</div>}
          <br />
          <div className={styles.captchaBox}>{captchaCode}</div>
          <br />
          <input
            type="text"
            id="captchaInput"
            placeholder="Enter Captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          />
          <br />
          <button type="submit" className={styles.loginBtn}>Login</button>
        </form>
        <div className={styles.links}>
          <a href="#">Forgot Password?</a> |
          <a href="#">Contact Admin</a>
        </div>
      </div>
    </div>
  );
}
