import React from 'react';
import '../styles/Dashboard.css';
import NavbarTop from './NavbarTop';

const Dashboard = () => {
  return (
    <>
    <NavbarTop />
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard</h2>
      <p>Here you can manage complaints and view your data.</p>
    </div>
    </>
  );
};

export default Dashboard;
