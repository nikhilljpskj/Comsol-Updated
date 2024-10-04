import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Registration.css';

function Registration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userType: '',
    email: '',
    mobile: '',
    office: '',
    officeAddress: '',
    gender: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure the API URL points to the correct backend URL 
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <select name="userType" onChange={handleChange}>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
        </select>
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <input name="office" placeholder="Office" onChange={handleChange} required />
        <input name="officeAddress" placeholder="Office Address" onChange={handleChange} required />
        <input name="gender" placeholder="Gender" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
