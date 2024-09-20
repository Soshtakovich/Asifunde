import React, { useState } from "react";
import '../../CSS/Main-small-components-css/Announcement.css'

// Data for subjects
const announcementData = [
  {
    name: "Mathematics",
    announcements: [
      {
        details: [
          { label: "Date", value: "25 June 2024", type: "date" },
          { label: "Subject", value: "Class", type: "subject" },
          { label: "Content", value: "Will be Moved to Sunday", type: "info" },
        ]
      },
      {
        details: [
          { label: "Date", value: "26 June 2024", type: "date" },
          { label: "Subject", value: "Exam", type: "subject" },
          { label: "Content", value: "Final exam will be conducted online", type: "info" },
        ]
      },
      
    ],
  },
  {
    name: "Physical Sciences",
    announcements: [
      {
        details: [
          { label: "Date", value: "27 June 2024", type: "date" },
          { label: "Subject", value: "Lab", type: "subject" },
          { label: "Content", value: "Will be Moved to Monday", type: "info" },
        ]
      }
    ]
  }
];

const Announcements = () => {
  const [openSubject, setOpenSubject] = useState(null); // Track which subject is open

  const toggleSubject = (subjectName) => {
    if (openSubject === subjectName) {
      setOpenSubject(null); // Close the currently open subject
    } else {
      setOpenSubject(subjectName); // Open the clicked subject
    }
  };

  return (
    <div>
      {announcementData.map((subject) => (
        <div key={subject.name}>
          {/* Subject Header */}
          <div
            className="subject-header"
            onClick={() => toggleSubject(subject.name)}
          >
            {subject.name}
          </div>

          {/* Subject Announcements */}
          {openSubject === subject.name && (
            <div className="content">
              {subject.announcements.map((announcement, index) => (
                <div key={index} className="announcement">
                  <div className="detail-box">
                    <div className="box">
                      <div className="subheadz">
                        <strong>{announcement.details[0].label}:</strong>
                      </div>
                      <div className="announce-content">
                        {announcement.details[0].value}
                      </div>
                    </div>

                    <div className="box">
                      <div className="subheadz">
                        <strong>{announcement.details[1].label}:</strong>
                      </div>
                      <div className="announce-content">
                        {announcement.details[1].value}
                      </div>
                    </div>
                  </div>

                  <div className="info-box">
                    <div className="subheadz">
                      <strong>{announcement.details[2].label}:</strong>
                    </div>
                    <div className="announce-content">
                      <p>{announcement.details[2].value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Announcements;
