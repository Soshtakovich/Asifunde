import React, { useState } from 'react';
import '../../../CSS/Main-small-components-css/Subjectpage.css'; // For styling
import Displaysubjectassessments from './subjectassessments';

const Subjectpage = ({ subject }) => {
  // State to track which dropdown is open
  const [activeDropdown, setActiveDropdown] = useState(null);

  const subjectsData = {
    "Content": [
      { heading: "Chapter 1", content: "Introduction to React." },
      { heading: "Chapter 2", content: "React Components." }
    ],
    "Announcements": [
      { heading: "Holiday Announcement", content: "No classes on Friday." },
      { heading: "Exam Schedule", content: "Exams will start from next week." }
    ],
    "Results": [
      { heading: "Mid-Term Results", content: "Results for the mid-term assessment." },
      { heading: "Final Results", content: "Results for the final assessment." }
    ]
  };

  // Toggle dropdown visibility
  const toggleDropdown = (blockName) => {
    setActiveDropdown(activeDropdown === blockName ? null : blockName);
  };

  return (
    <div className="subject-page">
      {/* Display the selected subject name */}
      <h2>{subject.Name}</h2>

      {/* Assessments Dropdown */}
      <div className="block-container">
        <div
          className="block"
          onClick={() => toggleDropdown("Assessments")}
          style={{ backgroundColor: getColorForBlock("Assessments") }}
        >
          Assessments
        </div>

        {activeDropdown === "Assessments" && (
          <div className="dropdown">
            <Displaysubjectassessments /> {/* Display Assessments under the dropdown */}
          </div>
        )}
      </div>

      {/* Other blocks (Content, Announcements, Results) */}
      {Object.keys(subjectsData).map((blockName, index) => (
        <div key={index} className="block-container">
          <div
            className="block"
            onClick={() => toggleDropdown(blockName)}
            style={{ backgroundColor: getColorForBlock(blockName) }}
          >
            {blockName}
          </div>

          {activeDropdown === blockName && (
            <div className="dropdown">
              {subjectsData[blockName].map((item, idx) => (
                <div key={idx} className="dropdown-item">
                  <h3>{item.heading}</h3>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Helper function to dynamically assign colors
const getColorForBlock = (blockName) => {
  switch (blockName) {
    case "Assessments":
      return 'gray';
    case "Content":
      return 'lightgreen';
    case "Announcements":
      return 'lightblue';
    case "Results":
      return 'deepskyblue';
    default:
      return 'white';
  }
};

export default Subjectpage;
