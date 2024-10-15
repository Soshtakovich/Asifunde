import React, { useEffect, useState } from "react";
import '../../CSS/Main-small-components-css/Announcement.css';

const Announcements = () => {
  const [announcementData, setAnnouncementData] = useState([]);
  const [openSubject, setOpenSubject] = useState(null); // Track which subject is open

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const learnerNumber = sessionStorage.getItem('Learner_Number'); // Get learner number from session storage
      if (!learnerNumber) {
        console.error("Learner number not found in session storage");
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/api/learnerannouncements/${learnerNumber}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAnnouncementData(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

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
          <div
            className="subject-header"
            onClick={() => toggleSubject(subject.name)}
          >
            {subject.name}
          </div>
          {openSubject === subject.name && (
            <div className="content">
              {subject.announcements.map((announcement, index) => (
                <div key={index} className="announcement">
                  <div className="detail-box">
                    {announcement.details.map((detail, i) => (
                      <div key={i} className="box">
                        <div className="subheadz">
                          <strong>{detail.label}:</strong>
                        </div>
                        <div className="announce-content">
                          {detail.value}
                        </div>
                      </div>
                    ))}
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
