import React, { useState } from 'react';
import '../CSS/Content.css';

const SubjectContent = () => {
  const [topics, setTopics] = useState([
    {
      name: "Topic 1",
      subtopics: [{ name: "Subtopic 1.1", notes: null, worksheet: null }],
      isOpen: false,
    },
    {
      name: "Topic 2",
      subtopics: [{ name: "Subtopic 2.1", notes: null, worksheet: null }],
      isOpen: false,
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [newTopic, setNewTopic] = useState({ name: "", subtopic: "", notes: null, worksheet: null });

  // Function to toggle the dropdown for a topic
  const toggleTopic = (index) => {
    setTopics(
      topics.map((topic, i) =>
        i === index ? { ...topic, isOpen: !topic.isOpen } : topic
      )
    );
  };

  // Function to add a new topic with a subtopic, notes, and worksheet
  const addNewTopic = (e) => {
    e.preventDefault();
    const newTopicData = {
      name: newTopic.name,
      subtopics: [{ name: newTopic.subtopic, notes: newTopic.notes, worksheet: newTopic.worksheet }],
      isOpen: false,
    };
    setTopics([...topics, newTopicData]);
    setShowPopup(false); // Close the popup after adding
  };

  // Function to add a new subtopic to a topic
  const addSubtopic = (index) => {
    const subtopicName = prompt("Enter new subtopic name:");
    const notes = prompt("Upload Notes:"); // In a real app, you'd use a file input
    const worksheet = prompt("Upload Worksheet:"); // In a real app, you'd use a file input
    if (subtopicName) {
      const updatedTopics = [...topics];
      updatedTopics[index].subtopics.push({ name: subtopicName, notes, worksheet });
      setTopics(updatedTopics);
    }
  };

  return (
    <div className="subject-content-container">
      <button className="add-topic-btn" onClick={() => setShowPopup(true)}>+ Add Topic</button>

      {showPopup && (
        <div className="popup-form">
          <form onSubmit={addNewTopic}>
            <label>
              Topic Name:
              <input type="text" value={newTopic.name} onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })} required />
            </label>
            <label>
              Subtopic Name:
              <input type="text" value={newTopic.subtopic} onChange={(e) => setNewTopic({ ...newTopic, subtopic: e.target.value })} required />
            </label>
            <label>
              Upload Notes:
              <input type="file" onChange={(e) => setNewTopic({ ...newTopic, notes: e.target.files[0] })} />
            </label>
            <label>
              Upload Worksheet:
              <input type="file" onChange={(e) => setNewTopic({ ...newTopic, worksheet: e.target.files[0] })} />
            </label>
            <button type="submit">Add Topic</button>
            <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
          </form>
        </div>
      )}

      <div className="topics-list">
        {topics.map((topic, index) => (
          <div key={index} className="topic-item">
            <div className="topic-header">
              <span className="topic-name" onClick={() => toggleTopic(index)}>
                {topic.name}
              </span>
              <button className="add-subtopic-btn" onClick={() => addSubtopic(index)}>+ Add Subtopic</button>
            </div>
            {topic.isOpen && (
              <div className="subtopics-list">
                {topic.subtopics.map((subtopic, subIndex) => (
                  <div key={subIndex} className="subtopic-item">
                    {subtopic.name}
                    {subtopic.notes && <div>Notes: {subtopic.notes.name}</div>}
                    {subtopic.worksheet && <div>Worksheet: {subtopic.worksheet.name}</div>}
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

export default SubjectContent;
