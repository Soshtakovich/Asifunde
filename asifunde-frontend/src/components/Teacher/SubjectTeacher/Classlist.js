import React, { useEffect, useState } from 'react';
import '../CSS/Main-small-components-css/ClassList.css';

const ClassList = () => {
  const [learners, setLearners] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLearner, setSelectedLearner] = useState(null);

  useEffect(() => {
    const fetchClassList = async () => {
      try {
        const teacherNumber = sessionStorage.getItem('Teacher_Number');

        if (!teacherNumber) {
          console.error('Teacher_Number not found in session storage');
          return;
        }

        // Call API using teacherNumber in the URL path
        const response = await fetch(`http://localhost:4000/api/classlist/${teacherNumber}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch class list');
        }

        const data = await response.json();
        setLearners(data);

        // Save the total number of learners in session storage
        sessionStorage.setItem('Total_Learners', data.length.toString());
        
      } catch (error) {
        console.error('Error fetching class list:', error);
      }
    };

    fetchClassList();
  }, []);

  // Function to handle showing the popup for each learner
  const handleMoreDetailsClick = (learner) => {
    setSelectedLearner(learner);
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedLearner(null);
  };

  return (
    <div className="class-list-container">
      <h1>CLASS LIST</h1>
      <table className="class-list-table">
        <thead>
          <tr>
            <th>Learner Number</th>
            <th>Surname</th>
            <th>Name</th>
            <th>Average</th>
            <th>Cell</th>
            <th>Parent Cell</th>
            <th>More Details</th>
          </tr>
        </thead>
        <tbody>
          {learners.map((learner, index) => (
            <tr key={index}>
              <td>{learner.Learner_Number}</td>
              <td>{learner.Surname}</td>
              <td>{learner.Names}</td>
              <td>{learner.average}</td>
              <td>{learner.Cell_number}</td>
              <td>{learner.Parent_Cell}</td>
              <td>
                <button
                  className="details-btn"
                  onClick={() => handleMoreDetailsClick(learner)}
                >
                  View More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup for more details */}
      {showPopup && selectedLearner && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{selectedLearner.Names} {selectedLearner.Surname} - Details</h2>
            
            <div className="student-picture">
                <img
                    src={selectedLearner.Picture}
                    alt={`${selectedLearner.Names} ${selectedLearner.Surname}`}
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
                {Array.from({ length: 6 }).map((_, i) => (
                  <td key={i}>{selectedLearner.assessments && selectedLearner.assessments[i] !== undefined ? selectedLearner.assessments[i] : 'N/A'}</td>
                  ))}

                  <td> <i>{selectedLearner.average}</i></td>
                </tr>
              </tbody>
            </table>


            <table>
              <thead>
                <tr>
                  <th>Cell</th>
                  <th>Parent Cell</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Parent Cell</th>
                  <th>Parent Whatsapp</th>
                  <th>Report</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedLearner.Cell_number}</td>
                  <td>{selectedLearner.Whatsapp_number}</td>
                  <td>{selectedLearner.Age}</td>
                  <td>{selectedLearner.Address}</td>
                  <td>{selectedLearner.Parent_Cell}</td>
                  <td>{selectedLearner.Parent_Whatsapp}</td>
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
