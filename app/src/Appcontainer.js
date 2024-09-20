import React, { useState, useEffect } from 'react';
import './Appcontainer.css';
import Teacher from './Teacher';
import Learner from './Learner';

function Container() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = window.prompt("Please enter your role (Teacher or Learner):");
    if (role === 'Learner' || role === 'Teacher') {
      setUserRole(role);
    } else {
      alert("Invalid role. Please refresh and enter either 'Teacher' or 'Learner'.");
    }
  }, []);

  return (
    <div className="container">
      {userRole === 'Learner' ? <Learner /> : userRole === 'Teacher' ? <Teacher /> : <div>Please select a role.</div>}
    </div>
  );
}

export default Container;
