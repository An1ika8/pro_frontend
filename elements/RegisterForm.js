import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';  

const RegisterForm = () => {
  const [user_id, setUser_id] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      const response = await axios.post('http://localhost:5000/api/v1/register', {
        user_id,
        username,
        email,
        password,
      });
  
      setSuccessMessage('Registration successful! Please log in.');
      setTimeout(() => navigate('/login'), 2000); 
    } catch (error) {
      setErrorMessage('An error occurred during registration');
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate('/login')}>Login</button>
      </form>
    </div>
  );
};

export default RegisterForm;
