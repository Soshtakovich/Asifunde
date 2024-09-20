import React, { useState } from 'react';
import '../CSS/Main-small-components-css/ClassList.css';


const ClassList = () => {
  // Sample dynamic data for the class list
  const [students] = useState([
    {
      learnerNumber: 'BET25-336267',
      surname: 'Matsimbe',
      name: 'Zakes',
      position: 4,
      average: 83,
      attendance: 98,
    },
    {
      learnerNumber: 'BET25-556268',
      surname: 'Billa',
      name: 'Geema',
      position: 3,
      average: 85,
      attendance: 92,
    },
    // Add more students for testing scroll
    {
      learnerNumber: 'BET25-736239',
      surname: 'Fede',
      name: 'Kuye',
      position: 5,
      average: 79,
      attendance: 100,
    },
    {
      learnerNumber: 'BET25-536270',
      surname: 'Zuko',
      name: 'Zakwe',
      position: 1,
      average: 95,
      attendance: 95,
    },
    {
      learnerNumber: 'BET25-236371',
      surname: 'Floyd',
      name: 'Ndlovu',
      position: 2,
      average: 90,
      attendance: 90,
    },
    // Add as many as necessary to exceed the scroll height

    {
        learnerNumber: 'BET25-556268',
        surname: 'Billa',
        name: 'Geema',
        position: 3,
        average: 85,
        attendance: 92,
      },
      // Add more students for testing scroll
      {
        learnerNumber: 'BET25-736239',
        surname: 'Fede',
        name: 'Kuye',
        position: 5,
        average: 79,
        attendance: 100,
      },
      {
        learnerNumber: 'BET25-536270',
        surname: 'Zuko',
        name: 'Zakwe',
        position: 1,
        average: 95,
        attendance: 95,
      },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Function to handle showing the popup for each student
  const handleMoreDetailsClick = (student) => {
    setSelectedStudent(student);
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedStudent(null);
  };

  return (
    <div className="class-list-container">
      <h1>CLASS LIST</h1>
      <div className="class-list-table-container">
        <table className="class-list-table">
          <thead>
            <tr>
              <th>Learner Number</th>
              <th>Surname</th>
              <th>Name</th>
              <th>Position in Class</th>
              <th>Average</th>
              <th>Attendance</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.learnerNumber}</td>
                <td>{student.surname}</td>
                <td>{student.name}</td>
                <td>{student.position}</td>
                <td>{student.average}</td>
                <td>{student.attendance}</td>
                <td>
                  <button
                    className="details-btn"
                    onClick={() => handleMoreDetailsClick(student)}
                  >
                    VIEW MORE DETAILS
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for more details */}
      {showPopup && selectedStudent && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{selectedStudent.name} {selectedStudent.surname} - Details</h2>
            <p><strong>Learner Number:</strong> {selectedStudent.learnerNumber}</p>
            <p><strong>Position in Class:</strong> {selectedStudent.position}</p>
            <p><strong>Average:</strong> {selectedStudent.average}</p>
            <p><strong>Attendance:</strong> {selectedStudent.attendance}</p>
            <button className="close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
