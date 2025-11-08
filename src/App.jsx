import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import FacultyLogin from './components/FacultyLogin/FacultyLogin';
import NonTeachingLogin from './components/NonTeachingLogin/NonTeachingLogin';
import Dashboard from './components/Dashboard/Dashboard';
import FacultyDashboard from './components/FacultyDashboard/FacultyDashboard';
import NonTeachingDashboard from './components/NonTeachingDashboard/NonTeachingDashboard';
import TechnicianDashboard from './components/TechnicianDashboard/TechnicianDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/nt-login" element={<NonTeachingLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/non-teaching-dashboard" element={<NonTeachingDashboard />} />
        <Route path="/technician-dashboard" element={<TechnicianDashboard />} />
        {/* Add routes for other specific non-teaching roles if needed, like vigilance */}
      </Routes>
    </Router>
  );
}

export default App;