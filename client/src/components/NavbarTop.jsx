import React, { useState, useEffect } from 'react';
import '../styles/NavbarTop.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material'; // Importing Avatar component from MUI

function NavbarTop() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setUser(JSON.parse(localUser));
    } else {
      // Fetch user from the server if not available in local storage
      fetchCurrentUser();
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/current-user', { withCredentials: true });
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {});
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleProfile = () => {
    navigate('/profile'); // Change this to your profile route
  };

  return (
    <div className="navbar-top">
      <div className="navbar-right">
        {user && (
          <div className="user-menu">
            <span
              className="user-name"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Avatar alt={user.first_name} src="/static/images/avatar/1.jpg" /> {/* Replace with actual avatar */}
              <span className="username-text">{user.first_name}</span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleProfile}>Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarTop;
