import React, { useState } from 'react';
import '../CSS/Content.css';
import Announcementpop from './Addannouncement';// Import the new component

const Announcement = () => {
  const [topics, setTopics] = useState([
    {
      name: "Test 3",
      subtopics: [
        { name: "Test date changed to 5 April 2024", content: null, worksheet: null },
      ],
      isOpen: false,
    },
    {
      name: "Classes",
      subtopics: [
        { name: "Science Monday", content: null, worksheet: null },
        { name: "Maths Sunday", content: null, worksheet: null },
      ],
      isOpen: false,
    },
  ]);

  const [showTopicPopup, setShowTopicPopup] = useState(false);
  const [newTopic, setNewTopic] = useState({ name: "", subtopic: "", content: null, worksheet: null });

  const [showSubtopicPopup, setShowSubtopicPopup] = useState(false);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [newSubtopic, setNewSubtopic] = useState({ name: "", content: null, worksheet: null });

  // Function to toggle the dropdown for a topic
  const toggleTopic = (index) => {
    setTopics(
      topics.map((topic, i) =>
        i === index ? { ...topic, isOpen: !topic.isOpen } : topic
      )
    );
  };

  // Function to add a new topic
  const addNewTopic = (e) => {
    e.preventDefault();
    const newTopicData = {
      name: newTopic.name,
      subtopics: [{ name: newTopic.subtopic, content: newTopic.content, worksheet: newTopic.worksheet }],
      isOpen: false,
    };
    setTopics([...topics, newTopicData]);
    setShowTopicPopup(false); // Close the popup after adding
  };

  // Function to add a new subtopic to a topic (untouched as requested)
  const addNewSubtopic = (e) => {
    e.preventDefault();
    const updatedTopics = [...topics];
    updatedTopics[selectedTopicIndex].subtopics.push({ name: newSubtopic.name, content: newSubtopic.content, worksheet: newSubtopic.worksheet });
    setTopics(updatedTopics);
    setShowSubtopicPopup(false); // Close the popup after adding
  };

  return (
    <div className="subject-content-container">
      {/* Add Topic Button */}
      <button className="add-topic-btn" onClick={() => setShowTopicPopup(true)}>+ Add an Announcement</button>

      {/* Add Topic Popup */}
      {showTopicPopup && (
        <Announcementpop newTopic={newTopic} setNewTopic={setNewTopic} addNewTopic={addNewTopic}  setShowTopicPopup={setShowTopicPopup}/>
      )}

      {/* Topic List */}
      <div className="topics-list">
        {topics.map((topic, index) => (
          <div key={index} className="topic-item">
            <div className="topic-header">
              <span className="topic-name" onClick={() => toggleTopic(index)}>
                {topic.name}
              </span>
              <button
                className="add-subtopic-btn"
                onClick={() => {
                  setSelectedTopicIndex(index);
                  setShowSubtopicPopup(true);
                }}
              >
                + Sub Announcement
              </button>
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

      {/* Add Subtopic Popup (left untouched as requested) */}
      {showSubtopicPopup && (
        <div className="popup-form">
          <form onSubmit={addNewSubtopic}>
            <label>
              Sub Announcement Name:
              <input
                type="text"
                value={newSubtopic.name}
                onChange={(e) => setNewSubtopic({ ...newSubtopic, name: e.target.value })}
                required
              />
            </label>
            <label>
              Sub Announcement Content:
              <input
                type="text-area"
                value={newSubtopic.content}
                onChange={(e) => setNewSubtopic({ ...newSubtopic, content: e.target.value })}
                required
              />
            </label>

            <button type="submit">Add Subtopic</button>
            <button type="button" onClick={() => setShowSubtopicPopup(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Announcement;
