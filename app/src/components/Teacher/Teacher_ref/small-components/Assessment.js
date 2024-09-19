import React, { useState } from 'react';
import '../css/assessments.css';

// Helper function to calculate the difference in days between two dates
const calculateDaysRemaining = (dueDate) => {
  const today = new Date();
  const dueDateObj = new Date(dueDate.split('-').reverse().join('-'));
  const differenceInTime = dueDateObj.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // convert milliseconds to days
  return differenceInDays;
};

// Sample data
const assessmentsData = [
  {
    subject: "Solve For X",
    assessments: [
      { title: "Zakes Matsimbe", dueDate: "10-08-2024", subDate: "12-08-2024", status: "Completed", mark: "12/15" },
      { title: "Alfred Toe", dueDate: "14-08-2023", subDate: "14-08-2023", status: "Pending", mark: "0/15" },
      { title: "Jose Plato", dueDate: "14-08-2023", subDate: "14-08-2023", status: "Process", mark: "4/15" },
    ],
  },
];

const AssessmentItem = ({ title, dueDate, subDate, status, mark }) => {
  const daysRemaining = calculateDaysRemaining(dueDate);

  return (
    <tr>
      <td><p>{title}</p></td>
      <td>{dueDate}</td>
      <td>{subDate}</td>
      <td><span className={`status ${status.toLowerCase()}`}>{status}</span></td>

      <td>
        {daysRemaining < 0 ? (
          <span className="status overdue">Overdue</span>
        ) : (
          <span className={`status ${status.toLowerCase()}`}>{daysRemaining} days</span>
        )}
      </td>
      
      
      <td><span className={`status ${status.toLowerCase()}`}>{mark}</span></td>
    </tr>
  );
};

const AssessmentList = ({ assessments }) => (
  <div className="orders">
    <div className="header">
      <i className='bx bx-receipt'></i>
      <h3>Assessments</h3>
      <i className='bx bx-filter'></i>
      <i className='bx bx-search'></i>
    </div>
    <table>
      <thead>
        <tr>
          <th>Assessment Title</th>
          <th>Due Date</th>
          <th>Submission Date</th>
          <th>Status</th>
          <th>Days Remaining</th>
          <th>Mark</th>
        </tr>
      </thead>
      <tbody>
        {assessments.map((assessment, index) => (
          <AssessmentItem key={index} {...assessment} />
        ))}
      </tbody>
    </table>
  </div>
);

const SubjectItem = ({ subject, assessments }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <li className="completed" onClick={toggleSubContent}>
        <div className="task-title">
          <i className='bx bx-check-circle'></i>
          <p>{subject}</p>
        </div>
        <i className='bx bx-dots-vertical-rounded'></i>
      </li>
      {isOpen && (
        <div className="sub_cont" style={{ marginLeft: "30px" }}>
          <AssessmentList assessments={assessments} />
        </div>
      )}
    </>
  );
};

const Reminders = () => (
  <div className="reminders">
    <div className="header">
      <i className='bx bx-note'></i>
      <h3>Assessments</h3>
    </div>
    <ul className="task-list">
      {assessmentsData.map((subjectData, index) => (
        <SubjectItem key={index} {...subjectData} />
      ))}
    </ul>
  </div>
);

const Assessments = () => {
  return (
    <div>
      <Reminders />
    </div>
  );
};

export default Assessments;
