import React, { useState } from 'react';
import './App.css';
import Container from './Appcontainer';
import Login from './components/Login/login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Function to handle login and authenticate the user
  const handleLogin = (username, password) => {
    if ((username === 'Zex' && password === 'abcd1234') || (username === 'TZex' && password === 'abcd1234')) {
      setIsAuthenticated(true); // User is authenticated

      // Set role based on username
      if (username === 'Zex') {
        setUserRole('Learner');
      } else if (username === 'TZex') {
        setUserRole('Teacher');
      }
    } else {
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Conditionally render the Login component or Container based on authentication */}
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Container userRole={userRole} />  
        )}
      </header>
    </div>
  );
}

export default App;
