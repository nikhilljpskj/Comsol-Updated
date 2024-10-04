import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate to other routes

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Send login request
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      }, { withCredentials: true });
      console.log(response.data);

      if (response.data.success) {
        // Redirect to home page with a success message
        navigate('/dashboard', { state: { message: 'Login successful' } });

        // Save user data to localStorage only after successful login
        localStorage.setItem('user', JSON.stringify(response.data.user));

      } else {
        // Handle unsuccessful login
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Handle network errors or unexpected errors
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-reg-form-container">
      <div className="container">
        <input type="checkbox" id="check" />
        <div className="login form">
          <header>Login</header>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              value={email}
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              value={password}
              required
            />
            <input type="submit" className="button" value="Login" />
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};
