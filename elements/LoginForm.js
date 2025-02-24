import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';  // Make sure to import the CSS file for styling

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear the previous error message

    try {
      // Send the login credentials to the server
      const response = await axios.post('http://localhost:5000/api/v1/login', {
        username,
        password,
      });

      const token = response.data.token;

      // Store the token in localStorage and notify parent component
      localStorage.setItem('token', token);
      onLogin(token); // Passing the token to the parent component
      navigate('/home'); // Redirect to the home page after successful login
    } catch (error) {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}  {/* Show error if login fails */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}  // Update username on change
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Update password on change
            required
          />
        </div>
        <button type="submit">Login</button>  
        <button type="button" onClick={() => navigate('/')}>Register</button>
      </form>
    </div>
  );
};

export default LoginForm;
