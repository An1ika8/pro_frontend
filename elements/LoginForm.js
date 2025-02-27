import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';  

const LoginForm = ({ onLogin }) => {
  const [user_id, setUser_id] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
  
    try {
      const response = await axios.post('http://localhost:5000/api/v1/login', {
        user_id,
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
          <label htmlFor="user_id">User Id</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}  
            required
          />
        </div>
      
      
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
