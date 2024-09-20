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
      assessments: [85, 67, 58, 77, 86, 90],
      cell: '0787546323',
      whatsapp: '0787546323',
      age: 15,
      address: '29 Rasetlong, Bekkersdal',
      parentCell: '0726548253',
      parentWhatsapp: '0635234568',
      picture : 'https://wallpapers.com/images/hd/cool-profile-picture-paper-bag-head-4co57dtwk64fb7lv.jpg',
    },
    // Add more students here for testing scroll
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

            <div className="student-picture">
                <img
                    src={selectedStudent.picture}
                    alt={`${selectedStudent.name} ${selectedStudent.surname}`}
                    className="student-img"
                />
            </div>



            <table>
              <thead>
                <tr>
                  <th>Assessment 1</th>
                  <th>Assessment 2</th>
                  <th>Assessment 3</th>
                  <th>Assessment 4</th>
                  <th>Assessment 5</th>
                  <th>Assessment 6</th>
                  <th>Average</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {selectedStudent.assessments.map((score, i) => (
                    <td key={i}>{score}</td>
                  ))}
                  <td>{selectedStudent.average}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Cell</th>
                  <th>Whatsapp</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Parent Cell</th>
                  <th>Parent Whatsapp</th>
                  <th>Report</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedStudent.cell}</td>
                  <td>{selectedStudent.whatsapp}</td>
                  <td>{selectedStudent.age}</td>
                  <td>{selectedStudent.address}</td>
                  <td>{selectedStudent.parentCell}</td>
                  <td>{selectedStudent.parentWhatsapp}</td>
                  <td>
                    <button className="details-btn">Report Learner</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="close-btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
