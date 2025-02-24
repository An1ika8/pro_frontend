import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';  

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 

    try {
      
      const response = await axios.post('http://localhost:5000/api/v1/login', {
        username,
        password,
      });

      const token = response.data.token;

      
      localStorage.setItem('token', token);
      onLogin(token); 
      navigate('/home'); 
    } catch (error) {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}  
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}  
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
            onChange={(e) => setPassword(e.target.value)}  
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
