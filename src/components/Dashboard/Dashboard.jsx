import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css'; // Import CSS Module

function Dashboard() {
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
      // For now, these are placeholder URLs. In a full app, you'd have routes like /dashboard/attendance
      if (url && url !== '#') {
        // navigate(url); // Uncomment this line if you have actual routes for these
      }
      console.log(`Navigating to: ${url}`); // Placeholder
    }, 300);
  };

  useEffect(() => {
    // Set welcome message based on user ID from localStorage
    const userId = localStorage.getItem("userId") || "Student";
    document.getElementById("welcomeUser").textContent = `Welcome, ${userId}`;
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.sidebar}>
        <h2>ERP Menu</h2>
        <ul>
          <li><a href="#"><i className="fas fa-home"></i> Home</a></li>
          <li className={styles.dropdown}>
            <div className={styles.dropdownToggle} onClick={(e) => toggleDropdown(e.currentTarget)}>
              <i className="fas fa-book"></i> Academic Registration
              <i className="fas fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
            </div>
            <ul className={styles.dropdownMenu}>
              <li><a href="#">New Registration</a></li>
              <li><a href="#">Modify Registration</a></li>
              <li><a href="#">Cancel Registration</a></li>
            </ul>
          </li>
          <li><a href="#"><i className="fas fa-clipboard-list"></i> Attendance Register</a></li>
          <li className={styles.dropdown}>
            <div className={styles.dropdownToggle} onClick={(e) => toggleDropdown(e.currentTarget)}>
              <i className="fas fa-stream"></i> Courses
              <i className="fas fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
            </div>
            <ul className={styles.dropdownMenu}>
              <li><a href="#">Current Courses</a></li>
              <li><a href="#">Course History</a></li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            <div className={styles.dropdownToggle} onClick={(e) => toggleDropdown(e.currentTarget)}>
              <i className="fas fa-file-alt"></i> Exam Section
              <i className="fas fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
            </div>
            <ul className={styles.dropdownMenu}>
              <li><a href="#">Exam Schedule</a></li>
              <li><a href="#">Results</a></li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            <div className={styles.dropdownToggle} onClick={(e) => toggleDropdown(e.currentTarget)}>
              <i className="fas fa-users"></i> Clubs/Activities
              <i className="fas fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
            </div>
            <ul className={styles.dropdownMenu}>
              <li><a href="#">Join Clubs</a></li>
              <li><a href="#">Activities Calendar</a></li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            <div className={styles.dropdownToggle} onClick={(e) => toggleDropdown(e.currentTarget)}>
              <i className="fas fa-credit-card"></i> Fee Payments
              <i className="fas fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
            </div>
            <ul className={styles.dropdownMenu}>
              <li><a href="#">View Fees</a></li>
              <li><a href="#">Make Payment</a></li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            <div className={styles.dropdownToggle} onClick={(e) => toggleDropdown(e.currentTarget)}>
              <i className="fas fa-bed"></i> Hostel Management
              <i className="fas fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
            </div>
            <ul className={styles.dropdownMenu}>
              <li><a href="#">Room Allotment</a></li>
              <li><a href="#">Mess Menu</a></li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            <div className={styles.dropdownToggle} onClick={(e) => toggleDropdown(e.currentTarget)}>
              <i className="fas fa-book-open"></i> Library
              <i className="fas fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
            </div>
            <ul className={styles.dropdownMenu}>
              <li><a href="#">Search Books</a></li>
              <li><a href="#">Issued Books</a></li>
              <li><a href="#">Return Books</a></li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            <div className={styles.dropdownToggle} onClick={(e) => toggleDropdown(e.currentTarget)}>
              <i className="fas fa-user"></i> Profile
              <i className="fas fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
            </div>
            <ul className={styles.dropdownMenu}>
              <li><a href="#">View Profile</a></li>
              <li><a href="#">Edit Profile</a></li>
              <li><a href="#">Change Password</a></li>
            </ul>
          </li>
          <li><a href="#"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        <header>
          <h1 id="welcomeUser">Welcome, Student</h1>
        </header>

        <div className={styles.dashboardCards}>
          <div className={styles.card} onClick={(e) => redirectWithAnimation(e.currentTarget, 'attendance.html', e)}>
            <h3><i className="fas fa-user-check"></i> Attendance %</h3>
            <p>92%</p>
          </div>

          <div className={styles.card} onClick={(e) => redirectWithAnimation(e.currentTarget, 'cgpa.html', e)}>
            <h3><i className="fas fa-graduation-cap"></i> CGPA</h3>
            <p>8.65</p>
          </div>

          <div className={styles.card} onClick={(e) => redirectWithAnimation(e.currentTarget, 'assignments.html', e)}>
            <h3><i className="fas fa-tasks"></i> Assignments Due</h3>
            <p>3</p>
          </div>

          <div className={styles.card} onClick={(e) => redirectWithAnimation(e.currentTarget, 'exams.html', e)}>
            <h3><i className="fas fa-calendar-alt"></i> Upcoming Exams</h3>
            <p>2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;