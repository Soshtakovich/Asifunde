import React from 'react';
import  './Appcontainer.css';
import Teacher from './Teacher';
import Learner from './Learner';

const userRole = 'Learner';

//{userRole === 'Learner' ? <Learner /> : <Teacher />}

function Container() {
  return (
    <>
        <div className="container">

        {userRole === 'Learner' ? <Learner /> : <Teacher />}
            
        </div>
       
    </>
  );
}

export default Container;
