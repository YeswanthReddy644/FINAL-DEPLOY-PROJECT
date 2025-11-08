import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function generateCaptcha() {
  let chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');

  useEffect(() => {
    setCaptchaCode(generateCaptcha());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (captchaInput !== captchaCode) {
      alert("Captcha does not match. Try again.");
      setCaptchaCode(generateCaptcha()); // Regenerate captcha on failure
      setCaptchaInput(''); // Clear captcha input
      return;
    }

    // In a real application, you would send userId and password to a server for authentication.
    // For this example, we'll just save userId and navigate.
    localStorage.setItem("userId", userId);
    navigate("/dashboard");
  };

  return (
    <div className={styles.body}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            id="userid"
            placeholder="User ID Number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          /><br />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <div className={styles.captchaBox}>{captchaCode}</div><br />
          <input
            type="text"
            id="captchaInput"
            placeholder="Enter Captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          /><br />
          <button type="submit" className={styles.loginBtn}>Login</button>
        </form>
        <div className={styles.links}>
          <a href="#">Forgot Password?</a> |
          <a href="#">Parent Registration</a>
        </div>
      </div>
    </div>
  );
}

export default Login;