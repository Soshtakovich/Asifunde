import React, { useState } from 'react';
import '../../../CSS/Main-small-components-css/Subjectpage.css'; // For styling
import Displaysubjectassessments from './subjectassessments';

const Subjectpage = ({ subject }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const subjectsData = {
    "Content": [
      {
        heading: "Chapter 1: Introduction to React",
        content: "Introduction to React.",
        subtopics: [
          { title: "What is React", link: "#" },
          { title: "Variables", link: "#" }
        ]
      },
      {
        heading: "Chapter 2: Props",
        content: "Introduction to Props.",
        subtopics: [
          { title: "What are Props", link: "#" },
          { title: "Using Props", link: "#" }
        ]
      }
    ],
    "Announcements": [
      {
        heading: "Holiday Announcement",
        content: "No classes on Friday.",
        subtopics: [
          { title: "Summer Break", link: "#" },
          { title: "Winter Break", link: "#" }
        ]
      },
      {
        heading: "Exam Schedule",
        content: "Exams will start next week.",
        subtopics: [
          { title: "Mid-Term Exams", link: "#" },
          { title: "Final Exams", link: "#" }
        ]
      }
    ],
    "Results": [
      {
        heading: "Mid-Term Results",
        content: "Results for the mid-term assessment.",
        subtopics: [
          { title: "Top Scorers", link: "#" },
          { title: "Average Scores", link: "#" }
        ]
      },
      {
        heading: "Final Results",
        content: "Results for the final assessment.",
        subtopics: [
          { title: "Pass Percentage", link: "#" },
          { title: "Subject-Wise Performance", link: "#" }
        ]
      }
    ]
  };

  const toggleDropdown = (blockName) => {
    setActiveDropdown(activeDropdown === blockName ? null : blockName);
  };

  return (
    <div className="subject-page">
      {/*  <h2>{subject.Name}</h2>  */}

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
            <Displaysubjectassessments />
          </div>
        )}
      </div>

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
                  
                  {/* Subtopics as hyperlinks */}
                  {item.subtopics && (
                    <ul>
                      {item.subtopics.map((subtopic, subIdx) => (
                        <li key={subIdx}>
                          <a href={subtopic.link}>{subtopic.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

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
