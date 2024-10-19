import React from 'react';
import './Appcontainer.css';
import Teacher from './Teacher';
import Learner from './Learner';

function Container({ userRole }) {
  return (
    <div className="container">
      {userRole === 'Learner' ? <Learner /> : userRole === 'Teacher' ? <Teacher /> : <div>Please select a role.</div>}
    </div>
  );
}

export default Container;
