import React, { useState, useEffect } from 'react';
import '../styles/NavbarLeft.css';
import { Link, useNavigate } from 'react-router-dom';
import { Dashboard, BarChart, People, Task } from '@mui/icons-material';

const NavbarLeft = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the user object from localStorage
    } else {
      navigate('/login'); // Redirect to login if no user is found in localStorage
    }
  }, [navigate]);

  function isAdmin() {
    return user && user.user_type === 'Admin';
  }

  function isManager() {
    return user && user.user_type === 'Manager';
  }

  function isStaff() {
    return user && user.user_type === 'Staff';
  }

  const viewComplaintsLink = isStaff() ? '/views-complaints-staff' : '/views-complaints';

  return (
    <div className="navbar-left">
      <ul>
        <li>
          <Link to="/dashboard">
            <Dashboard /> Dashboard
          </Link>
        </li>
        {(isAdmin() || isManager()) && (
          <li>
          <Link to="/reports">
            <BarChart /> Report
          </Link>
        </li>
        )}
        {(isAdmin() || isManager()) && (
          <li>
            <Link to="/add-employee">
              <People /> Add Employee
            </Link>
          </li>
        )}
        <li>
          <Link to={viewComplaintsLink}>
            <Task />Complaints
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavbarLeft;
