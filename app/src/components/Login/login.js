// Login.js
import React, { useState } from 'react';
import './Login.css';

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        const { role, user } = data;

        // Store role-based information in session storage
        if (role === 'Learner') {
          sessionStorage.setItem('Learner_Number', user.Learner_Number);
        } else if (role === 'Teacher') {
          sessionStorage.setItem('Teacher_Number', user.Teacher_Number);
          sessionStorage.setItem('Grades_Taught', JSON.stringify(user.Grades));
          sessionStorage.setItem('Subjects_Taught', JSON.stringify(user.Subjects));
        }

        setIsAuthenticated(true);
        setUserRole(role);
      } else {
        alert(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title_">Asifunde</h1>
        <h2 className="login-title">Account Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-btn" type="submit">
            Sign In
          </button>
        </form>
        <div className="login-links">
          <a href="/">Forgot <span>Username / Password?</span></a>
        </div>
      </div>
    </div>
  );
};

export default Login;
