import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FacultyDashboard.module.css'; // Import CSS Module

function FacultyDashboard() {
  const navigate = useNavigate();

  const toggleDropdown = (element) => {
    const dropdownMenu = element.nextElementSibling;
    dropdownMenu.classList.toggle(styles.show);
  };

  const redirectWithAnimation = (card, url, event) => {
    card.classList.add(styles.animate);

    const ripple = document.createElement('span');
    ripple.classList.add(styles.ripple);

    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';

    card.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
    setTimeout(() => {
      // For now, these are placeholder URLs. In a full app, you'd have routes for these
      if (url && url !== '#') {
        // navigate(url); // Uncomment this line if you have actual routes for these
      }
      console.log(`Navigating to: ${url}`); // Placeholder
    }, 300);
  };

  useEffect(() => {
    // Set faculty ID in welcome message from localStorage
    const facultyId = localStorage.getItem("facultyId") || "Faculty";
    document.getElementById("facultyWelcome").textContent = `Welcome, ${facultyId}`;
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.sidebar}>
        <h2>Faculty Menu</h2>
        <ul>
          <li><a href="#"><i className="fas fa-home"></i> Home</a></li>
          <li className={styles.dropdown}>
            <div className={styles.dropdownToggle} onClick={(e) => toggleDropdown(e.currentTarget)}>
              <i className="fas fa-chalkboard-teacher"></i> My Classes
              <i className="fas fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
            </div>
            <ul className={styles.dropdownMenu}>
              <li><a href="#">Today's Schedule</a></li>
              <li><a href="#">Allotted Courses</a></li>
            </ul>
          </li>
          <li><a href="#"><i className="fas fa-user-check"></i> Mark Attendance</a></li>
          <li><a href="#"><i className="fas fa-tasks"></i> Assignments</a></li>
          <li><a href="#"><i className="fas fa-file-alt"></i> Exam Invigilation</a></li>
          <li><a href="#"><i className="fas fa-calendar-alt"></i> Timetable</a></li>
          <li><a href="#"><i className="fas fa-envelope"></i> Student Queries</a></li>
          <li><a href="#"><i className="fas fa-book"></i> Research & Publications</a></li>
          <li><a href="#"><i className="fas fa-award"></i> Achievements</a></li>
          <li><a href="#"><i className="fas fa-user"></i> Profile</a></li>
          <li><a href="#"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        <header>
          <h1 id="facultyWelcome">Welcome, Faculty</h1>
        </header>

        <div className={styles.dashboardCards}>
          <div className={styles.card} onClick={(e) => redirectWithAnimation(e.currentTarget, '#', e)}>
            <h3><i className="fas fa-chalkboard"></i> Classes Today</h3>
            <p>4</p>
          </div>

          <div className={styles.card} onClick={(e) => redirectWithAnimation(e.currentTarget, '#', e)}>
            <h3><i className="fas fa-users"></i> Students Assigned</h3>
            <p>120</p>
          </div>

          <div className={styles.card} onClick={(e) => redirectWithAnimation(e.currentTarget, '#', e)}>
            <h3><i className="fas fa-file-alt"></i> Assignments to Review</h3>
            <p>8</p>
          </div>

          <div className={styles.card} onClick={(e) => redirectWithAnimation(e.currentTarget, '#', e)}>
            <h3><i className="fas fa-book"></i> Research Papers</h3>
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;