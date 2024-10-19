import React, { useEffect, useState } from "react";
//import LearnerData from "./Progressdata"; // You can modify or remove this if it's no longer relevant
import '../../CSS/Progress.css';

const calculateAverage = (arr) => {
  return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
};

const LearnerProgress = () => {
  const [learnerProgress, setLearnerProgress] = useState(null);

  useEffect(() => {
    const fetchLearnerProgress = async () => {
      const learnerNumber = sessionStorage.getItem("Learner_Number");

      if (learnerNumber) {
        try {
          const response = await fetch(`http://localhost:4000/api/learnerprogress/${learnerNumber}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();

          if (response.ok) {
            setLearnerProgress(data);
          } else {
            console.error("Error fetching learner progress:", data.message);
          }
        } catch (error) {
          console.error("Error fetching learner progress:", error);
        }
      }
    };

    fetchLearnerProgress();
  }, []);

  if (!learnerProgress) {
    return <p>Loading...</p>;
  }

  const { name, learnerNumber, grade, academics, leaderboard, position, attendance } = learnerProgress;

  return (
    <div className="progress-item-container">
      {/* Left Section: Academic Data */}
      <div className="progress-item-section">
        <h2 className="progress-item-header-main">LEARNER PROGRESS</h2>
        <h3 className="progress-item-header-sub">{name}</h3>
        <p>Learner Number: {learnerNumber}</p>
        <p> {grade}</p>

        <h4 className="progress-item-header-section">Academic</h4>
        <table className="progress-item-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Assessments</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {academics.map((subjectData, index) => (
              <tr key={index}>
                <td>{subjectData.subject}</td>
                <td>{subjectData.assessments.join(", ")}</td>
                <td>{calculateAverage(subjectData.assessments)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <table className="progress-item-table">
          <thead>
            <tr>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
              <tr >
                <td> <p>{attendance} %</p></td>
              </tr>
          </tbody>
        </table>

        <table className="progress-item-table">
          <thead>
            <tr>
              <th>Position in {grade} class</th>
            </tr>
          </thead>
          <tbody>
              <tr >
                <td> <p>{position} </p></td>
              </tr>
          </tbody>
        </table>


      </div>



      {/* Right Section: Leaderboard */}
      <div className="progress-item-leaderboard-section">
        <div className="progress-item-section">
          <h3 className="progress-item-header-sub">Grade {grade} Leaderboard</h3>
          <table className="progress-item-leaderboard-table progress-item-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Mark (%)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr
                  key={index}
                  className={entry.name === name ? "progress-item-highlight-row" : ""}
                >
                  <td>{entry.position}</td>
                  <td>{entry.name}</td>
                  <td>{entry.mark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LearnerProgress;
