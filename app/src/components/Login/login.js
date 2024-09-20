import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {  // Receive onLogin as a prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Call the onLogin function with the username and password
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
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
          <button className="login-btn" type="submit">Sign In</button>
        </form>
        <div className="login-links">
          <a href="/">Forgot <span>Username / Password?</span></a>
        </div>
      </div>
    </div>
  );
};

export default Login;
