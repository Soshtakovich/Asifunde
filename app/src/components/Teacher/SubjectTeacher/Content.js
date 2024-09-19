// src/SubjectContent.js
import React, { useState } from 'react';
import '../CSS/Content.css';

const SubjectContent = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState({ name: "", subtopics: [], notes: null, worksheet: null });
  const [newSubtopic, setNewSubtopic] = useState({ name: "", notes: null, worksheet: null });
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isSubtopicModalOpen, setIsSubtopicModalOpen] = useState(false);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(null);

  const handleTopicSubmit = () => {
    if (newTopic.name && newSubtopic.name) {
      setTopics([...topics, { ...newTopic, subtopics: [{ ...newSubtopic }] }]);
      setNewTopic({ name: "", subtopics: [], notes: null, worksheet: null });
      setNewSubtopic({ name: "", notes: null, worksheet: null });
      setIsTopicModalOpen(false);
    }
  };

  const handleSubtopicSubmit = () => {
    if (newSubtopic.name) {
      const updatedTopics = [...topics];
      updatedTopics[currentTopicIndex].subtopics.push({ ...newSubtopic });
      setTopics(updatedTopics);
      setNewSubtopic({ name: "", notes: null, worksheet: null });
      setIsSubtopicModalOpen(false);
    }
  };

  return (
    <div className="subject-content-container">
      {/* Add Topic Button */}
      <button onClick={() => setIsTopicModalOpen(true)} className="add-topic-btn">
        Add Topic
      </button>

      {/* Topics List */}
      <div className="topics-list">
        {topics.map((topic, topicIndex) => (
          <div className="topic-item" key={topicIndex}>
            <div className="topic-header" onClick={() => setCurrentTopicIndex(topicIndex)}>
              <span className="topic-name">{topic.name}</span>
              <button onClick={() => setIsSubtopicModalOpen(true)} className="add-subtopic-btn">
                Add Subtopic
              </button>
            </div>
            <hr className="topic-divider" />
            {topicIndex === currentTopicIndex && (
              <div className="subtopics-list">
                {topic.subtopics.map((subtopic, subIndex) => (
                  <div className="subtopic-item" key={subIndex}>
                    <strong>{subtopic.name}</strong>
                    <p>Notes: {subtopic.notes ? subtopic.notes.name : "No notes uploaded"}</p>
                    <p>Worksheet: {subtopic.worksheet ? subtopic.worksheet.name : "No worksheet uploaded"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Topic Modal */}
      {isTopicModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Topic</h3>
            <label>Topic Name:</label>
            <input
              type="text"
              value={newTopic.name}
              onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
            />
            <label>Subtopic Name:</label>
            <input
              type="text"
              value={newSubtopic.name}
              onChange={(e) => setNewSubtopic({ ...newSubtopic, name: e.target.value })}
            />
            <label>Upload Notes:</label>
            <input
              type="file"
              onChange={(e) => setNewTopic({ ...newTopic, notes: e.target.files[0] })}
            />
            <label>Upload Worksheet:</label>
            <input
              type="file"
              onChange={(e) => setNewTopic({ ...newTopic, worksheet: e.target.files[0] })}
            />
            <div className="modal-buttons">
              <button onClick={handleTopicSubmit}>Submit</button>
              <button onClick={() => setIsTopicModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Subtopic Modal */}
      {isSubtopicModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Subtopic</h3>
            <label>Subtopic Name:</label>
            <input
              type="text"
              value={newSubtopic.name}
              onChange={(e) => setNewSubtopic({ ...newSubtopic, name: e.target.value })}
            />
            <label>Upload Notes:</label>
            <input
              type="file"
              onChange={(e) => setNewSubtopic({ ...newSubtopic, notes: e.target.files[0] })}
            />
            <label>Upload Worksheet:</label>
            <input
              type="file"
              onChange={(e) => setNewSubtopic({ ...newSubtopic, worksheet: e.target.files[0] })}
            />
            <div className="modal-buttons">
              <button onClick={handleSubtopicSubmit}>Submit</button>
              <button onClick={() => setIsSubtopicModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectContent;

