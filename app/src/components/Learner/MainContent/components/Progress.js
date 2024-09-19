// src/LearnerProgress.js
import React from "react";
import LearnerData from "./Progressdata";
import '../../CSS/Progress.css';

const calculateAverage = (arr) => {
  return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
};

const LearnerProgress = () => {
  const { name, learnerNumber, grade, academics, attendance, positions, leaderboard } = LearnerData;

  return (
    <div className="progress-item-container">
      {/* Left Section: Academic Data */}
      <div className="progress-item-section">
        <h2 className="progress-item-header-main">LEARNER PROGRESS</h2>
        <h3 className="progress-item-header-sub">{name}</h3>
        <p>Learner Number: {learnerNumber}</p>
        <p>Grade: {grade}</p>

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

        <h4 className="progress-item-header-section">Attendance</h4>
        <table className="progress-item-table">
          <thead>
            <tr>
              <th>First Half (Months)</th>
              <th>Second Half (Months)</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{attendance.firstHalf.join(", ")}</td>
              <td>{attendance.secondHalf.join(", ")}</td>
              <td>{((calculateAverage(attendance.firstHalf) * 1 + calculateAverage(attendance.secondHalf) * 1) / 2).toFixed(1)}</td>
            </tr>
          </tbody>
        </table>

        <h4 className="progress-item-header-section">Position</h4>
        <ul className="progress-item-position-list">
          {Object.keys(positions).map((subject, index) => (
            <li className="progress-item-position-list-item" key={index}>
              {subject}: {positions[subject]}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section: Leaderboard */}
      <div className="progress-item-leaderboard-section">
        <div className="progress-item-section">
          <h3 className="progress-item-header-sub">Grade 8 Leaderboard</h3>
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
