import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css'; // Import CSS Module

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const countersRef = useRef([]);

  useEffect(() => {
    // Counter animation logic
    countersRef.current.forEach(counter => {
      if (!counter) return;

      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText.replace(/,/g, '');
        const increment = Math.ceil(target / 100);

        if (current < target) {
          counter.innerText = (current + increment).toLocaleString();
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };
      updateCount();
    });
  }, []);

  const showRoleModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeRoleModal = () => {
    setIsModalOpen(false);
  };

  const selectRole = (role) => {
    if (role === 'student') {
      navigate('/login');
    } else if (role === 'faculty') {
      navigate('/faculty-login');
    } else if (role === 'non-teaching') {
      navigate('/nt-login');
    }
    closeRoleModal();
  };

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <a href="https://www.kluniversity.in/" target="_blank" rel="noopener noreferrer">About Us</a>
        <button className={styles.loginBtn} onClick={showRoleModal}>Login</button>
      </header>

      <div className={styles.center}>
        <h1>KL University ERP</h1>
        <p>Welcome to KL University ERP System</p>
      </div>

      <div className={styles.circleContainer}>
        <div className={styles.module} onClick={showRoleModal}>
          Students <br /><span className={styles.count} data-target="79278" ref={el => countersRef.current[0] = el}>0</span>
        </div>
        <div className={`${styles.module} ${styles.facultyModule}`} onClick={() => window.open('https://www.kluniversity.in/flist.aspx', '_blank')}>
          Faculty <br /><span className={styles.count} data-target="2644" ref={el => countersRef.current[1] = el}>0</span>
        </div>
        <div className={styles.module} onClick={showRoleModal}>
          Non-Teaching <br /><span className={styles.count} data-target="3843" ref={el => countersRef.current[2] = el}>0</span>
        </div>
        <div className={styles.module}>
          Journals <br /><span className={styles.count} data-target="31347" ref={el => countersRef.current[3] = el}>0</span>
        </div>
        <div className={styles.module}>
          Workshops <br /><span className={styles.count} data-target="14414" ref={el => countersRef.current[4] = el}>0</span>
        </div>
        <div className={styles.module}>
          Awards <br /><span className={styles.count} data-target="3638" ref={el => countersRef.current[5] = el}>0</span>
        </div>
        <div className={styles.module}>
          Projects <br /><span className={styles.count} data-target="1246" ref={el => countersRef.current[6] = el}>0</span>
        </div>
        <div className={styles.module}>
          Research <br /><span className={styles.count} data-target="1583" ref={el => countersRef.current[7] = el}>0</span>
        </div>

        <div className={styles.centerLogo} onClick={showRoleModal}>
          ERP
          <span>Click to Login</span>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.roleModal}>
          <div className={styles.modalContent}>
            <h2>Select Your Role</h2>
            <button className={styles.student} onClick={() => selectRole('student')}>Student</button>
            <button className={styles.faculty} onClick={() => selectRole('faculty')}>Faculty</button>
            <button className={styles.nonTeaching} onClick={() => selectRole('non-teaching')}>Non-Teaching Staff</button>
            <br /><br />
            <button className={styles.cancel} onClick={closeRoleModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;