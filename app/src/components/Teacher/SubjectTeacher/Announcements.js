import React, { useState, useEffect } from 'react';
import '../CSS/Content.css';

const Announcement = () => {
  const [topics, setTopics] = useState([]); // Announcements from backend
  const [showTopicPopup, setShowTopicPopup] = useState(false); // Popup state
  const [newAnnouncement, setNewAnnouncement] = useState({ heading: "", message: "" });
  const [teacherNumber, setTeacherNumber] = useState("");

  // Fetch Teacher_Number from sessionStorage and announcements on mount
  useEffect(() => {
    const storedTeacherNumber = sessionStorage.getItem('Teacher_Number');
    if (storedTeacherNumber) {
      setTeacherNumber(storedTeacherNumber);
      fetchAnnouncements(storedTeacherNumber);
    } else {
      console.error("No Teacher_Number found in sessionStorage");
    }
  }, []);

  // Fetch announcements from backend
// Fetch announcements from backend
const fetchAnnouncements = async (teacherNum) => {
  try {
    const response = await fetch(`http://localhost:4000/api/announcements/${teacherNum}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Keep this to check the fetched data

      // Transform the fetched data into the format you need
      const formattedData = data.map(announcement => ({
        name: announcement.heading, // Use heading for the topic name
        subtopics: [{ name: announcement.message }], // Use message for the subtopic
        isOpen: false, // Initialize the isOpen property
      }));

      setTopics(formattedData); // Set the transformed data to state
    } else {
      console.error("Failed to fetch announcements");
    }
  } catch (error) {
    console.error("Error fetching announcements:", error);
  }
};

  

  // Toggle a topic's open/closed state
  const toggleTopic = (index) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, i) =>
        i === index ? { ...topic, isOpen: !topic.isOpen } : topic
      )
    );
  };

  // Handle adding a new announcement
  const addNewAnnouncement = async (e) => {
    e.preventDefault();
    const data = {
      teacherNumber,
      contentHeading: newAnnouncement.heading,
      content: newAnnouncement.message,
    };

    try {
      const response = await fetch('http://localhost:4000/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const savedAnnouncement = await response.json();
        const newTopicData = {
          name: savedAnnouncement.contentHeading,
          subtopics: [{ name: savedAnnouncement.content }],
          isOpen: false,
        };
        setTopics((prevTopics) => [...prevTopics, newTopicData]);
        setShowTopicPopup(false);
        setNewAnnouncement({ heading: "", message: "" });
        alert('Announcement added successfully!'); // Alert on success
      } else {
        console.error('Failed to add the announcement');
        alert('Failed to add announcement. Please try again.');
      }
    } catch (error) {
      console.error('Error adding announcement:', error);
      alert('An error occurred while adding the announcement.');
    }
  };

  return (
    <div className="subject-content-container">
      {/* Add Announcement Button */}
      <button className="add-topic-btn" onClick={() => setShowTopicPopup(true)}>
        + Add an Announcement
      </button>

      {/* Announcement Popup */}
      {showTopicPopup && (
        <div className="popup-form">
          <form onSubmit={addNewAnnouncement}>
            <label>
              Announcement Title:
              <input
                type="text"
                value={newAnnouncement.heading}
                onChange={(e) =>
                  setNewAnnouncement({ ...newAnnouncement, heading: e.target.value })
                }
                required
              />
            </label>
            <label>
              Announcement Message:
              <input
                type="text"
                value={newAnnouncement.message}
                onChange={(e) =>
                  setNewAnnouncement({ ...newAnnouncement, message: e.target.value })
                }
                required
              />
            </label>
            <button type="submit">Add Announcement</button>
            <button type="button" onClick={() => setShowTopicPopup(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

                  {/* List of Topics and Subtopics */}
                  <div className="topics-list">
              {topics.map((topic, index) => (
                <div key={index} className="topic-item">
                  <div className="topic-header">
                    <span className="topic-name" onClick={() => toggleTopic(index)}>
                      {topic.name}
                    </span>
                  </div>
                  {topic.isOpen && (
                    <div className="subtopics-list">
                      {topic.subtopics.map((subtopic, subIndex) => (
                        <div key={subIndex} className="subtopic-item">
                          {subtopic.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

    </div>
  );
};

export default Announcement;
