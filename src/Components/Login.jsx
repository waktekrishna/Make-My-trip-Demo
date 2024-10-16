import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { Button } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { TextField } from '@mui/material'; 

const Login = () => {
  const [role, setRole] = useState('User');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const credentials = {
    User: { username: 'user', password: 'user123' },
    Admin: { username: 'admin', password: 'admin123' }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validUser = credentials[role];

    if (username === validUser.username && password === validUser.password) {
      if (role === 'User') {
        navigate('/flights'); 
      } else if (role === 'Admin') {
        navigate('/admin-dashboard');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <FormControl fullWidth className="form-input">
              <InputLabel id="role-label">Select Role</InputLabel>
              <Select labelId="role-label" id="role" value={role} label="Select Role" onChange={(e) => setRole(e.target.value)}>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </div>

            <div className="form-group">
              <TextField label="Username" variant="outlined" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-input" required fullWidth/>
            </div>

          <div className="form-group">
            <TextField label="Password" variant="outlined" type="password" id="password" value={password}
              onChange={(e) => setPassword(e.target.value)} className="form-input" required fullWidth />
          </div>
          {error && <p className="error-message">{error}</p>}

          <Button variant="contained" color="primary" type="submit" className="login-button">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
