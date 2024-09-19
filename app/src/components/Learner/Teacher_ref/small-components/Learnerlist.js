import React, { useState } from 'react';
import '../css/learnerlist.css';

const learners = [
  {
    surname: 'Matsimbe',
    name: 'Zakes Samson',
    age: 16,
    gender: 'Male',
    cell: '123-456-7890',
    parentCell: '098-765-4321',
    homeAddress: '123 Main St',
    average: '85%',
    picture: '/images/subjects/physical-sciences.jpg', // Placeholder image URL
    assessments: [80, 85, 88, 90, 75, 92, 87, 86]
  },
  
  // Add more learner objects as needed
];

const LearnerList = () => {
  const [selectedLearner, setSelectedLearner] = useState(null);

  const calculateAverage = (assessments) => {
    const total = assessments.reduce((acc, grade) => acc + grade, 0);
    return (total / assessments.length).toFixed(2);
  };

  const calculateSTD = (assessments) => {
    const avg = calculateAverage(assessments);
    const squareDiffs = assessments.map(value => Math.pow(value - avg, 2));
    const avgSquareDiff = calculateAverage(squareDiffs);
    return Math.sqrt(avgSquareDiff).toFixed(2);
  };

  const openPopup = (learner) => {
    setSelectedLearner(learner);
  };

  const closePopup = () => {
    setSelectedLearner(null);
  };

  return (
    <div>
      <table className='learners-info-teacher' >
        <thead>
          <tr>
            <th>Surname</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Cell</th>
            <th>Parent Cell</th>
            <th>Home Address</th>
            <th>Average</th>
            <th>GRADES</th>
          </tr>
        </thead>
        <tbody>
          {learners.map((learner, index) => (
            <tr key={index}>
              <td>{learner.surname}</td>
              <td>{learner.name}</td>
              <td>{learner.age}</td>
              <td>{learner.gender}</td>
              <td>{learner.cell}</td>
              <td>{learner.parentCell}</td>
              <td>{learner.homeAddress}</td>
              <td>{learner.average}</td>
              <td>
                <button onClick={() => openPopup(learner)}>Academic</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLearner && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close-btn-left" onClick={closePopup}>X</button>
            <button className="popup-close-btn" onClick={closePopup}>X</button>
            <div style={{ textAlign: 'center' }}>
              <img src={selectedLearner.picture} alt="Learner" />
              <h2>{selectedLearner.name} {selectedLearner.surname}</h2>
            </div>

            <table className='learner-info-teacher'>
              <thead>
                <tr>
                  <th>Surname</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Cell</th>
                  <th>Parent Cell</th>
                  <th>Home Address</th>
                  <th>Average</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedLearner.surname}</td>
                  <td>{selectedLearner.name}</td>
                  <td>{selectedLearner.age}</td>
                  <td>{selectedLearner.gender}</td>
                  <td>{selectedLearner.cell}</td>
                  <td>{selectedLearner.parentCell}</td>
                  <td>{selectedLearner.homeAddress}</td>
                  <td>{selectedLearner.average}</td>
                </tr>
              </tbody>
            </table>

                <br></br>

            <table className='learner-info-teacher'>
              <thead>
                <tr>
                  <th>Assessment 1</th>
                  <th>Assessment 2</th>
                  <th>Assessment 3</th>
                  <th>Assessment 4</th>
                  <th>Assessment 5</th>
                  <th>Assessment 6</th>
                  <th>Assessment 7</th>
                  <th>Assessment 8</th>
                  <th>Average</th>
                  <th>STD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {selectedLearner.assessments.map((grade, index) => (
                    <td key={index}>{grade}%</td>
                  ))}
                  <td>{calculateAverage(selectedLearner.assessments)}%</td>
                  <td>{calculateSTD(selectedLearner.assessments)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnerList;
