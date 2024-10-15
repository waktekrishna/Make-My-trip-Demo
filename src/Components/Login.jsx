import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const [role, setRole] = useState('User'); // Default role is 'User'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Static credentials for User and Admin
  const credentials = {
    User: { username: 'user', password: 'user123' },
    Admin: { username: 'admin', password: 'admin123' }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validUser = credentials[role];

    // Check if credentials match
    if (username === validUser.username && password === validUser.password) {
      if (role === 'User') {
        navigate('/flights'); // Redirect to User Dashboard or Navbar
      } else if (role === 'Admin') {
        navigate('/admin-dashboard'); // Redirect to Admin Dashboard or Navbar
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="role">Select Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-input"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
