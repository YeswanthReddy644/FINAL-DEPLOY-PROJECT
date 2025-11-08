import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NonTeachingDashboard.module.css';

function NonTeachingDashboard() {
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
      // In a real app, you might navigate to a specific internal route
      // For this example, we'll just use the provided URL or prevent default if '#'
      if (url && url !== '#') {
        navigate(url);
      } else {
        // Handle internal card click logic if no direct route
        console.log("Card clicked, no direct navigation for '#'");
      }
    }, 300);
  };

  useEffect(() => {
    // Dynamically set the welcome message for the warden, if needed
    // You might get the specific warden's name from context/props or state after login
    // For now, it's a generic "Warden"
    const ntRole = localStorage.getItem("ntRole");
    const ntId = localStorage.getItem("ntId");
    if (ntRole === "Warden" && ntId) {
        document.getElementById("welcomeWarden").textContent = `Welcome, Warden ${ntId}`;
    }
  }, []);


  return (
    <div className={styles.body}>
      <div className={styles.sidebar}>
        <h2>Hostel Warden Menu</h2>
        <ul>
          <li><a href="#"><i className="fas fa-home"></i> Home</a></li>
          <li><a href="#"><i className="fas fa-users"></i> Student List</a></li>
          <li><a href="#"><i className="fas fa-bed"></i> Room Allocation</a></li>
          <li><a href="#"><i className="fas fa-sign-out-alt"></i> Leave Requests</a></li>
          <li><a href="#"><i className="fas fa-tools"></i> Maintenance</a></li>
          <li><a href="#"><i className="fas fa-clipboard-check"></i> Attendance</a></li>
          <li><a href="#"><i className="fas fa-bullhorn"></i> Notices</a></li>
          <li><a href="#"><i className="fas fa-utensils"></i> Mess Menu</a></li>
          <li><a href="#"><i className="fas fa-user-cog"></i> Staff Management</a></li>
          <li><a href="#"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        <header>
          <h1 id="welcomeWarden">Welcome, Warden</h1>
        </header>

        <div className={styles.dashboardCards}>
          <div className={styles.card} onClick={(e) => redirectWithAnimation(e.currentTarget, '#', e)}>
            <h3><i className="fas fa-users"></i> Students in Hostel</h3>
            <p>320</p>
          </div>

          <div className={styles.card} onClick={(e) => redirectWithAnimation(e.currentTarget, '#', e)}>
            <h3><i className="fas fa-bed"></i> Vacant Rooms</h3>
            <p>12</p>
          </div>

          <div className={styles.card} onClick={(e) => redirectWithAnimation(e.currentTarget, '#', e)}>
            <h3><i className="fas fa-sign-out-alt"></i> Pending Leave Requests</h3>
            <p>5</p>
          </div>

          <div className={styles.card} onClick={(e) => redirectWithAnimation(e.currentTarget, '#', e)}>
            <h3><i className="fas fa-tools"></i> Maintenance Issues</h3>
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NonTeachingDashboard;