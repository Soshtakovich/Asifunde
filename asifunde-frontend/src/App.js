import React, { useState } from 'react';
import './App.css';
import Container from './Appcontainer';
import Login from './components/Login/login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Function to handle login and authenticate the user
  const handleLogin = (username, password) => {
    // Call the login API or your database logic here
    // You may want to move the login logic here instead of inside Login component
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Conditionally render the Login component or Container based on authentication */}
        {!isAuthenticated ? (
          <Login 
            onLogin={handleLogin} 
            setIsAuthenticated={setIsAuthenticated} 
            setUserRole={setUserRole}
          />
        ) : (
          <Container userRole={userRole} />  
        )}
      </header>
    </div>
  );
}

export default App;
