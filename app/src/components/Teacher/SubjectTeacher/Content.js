// src/SubjectContent.js
import React, { useState } from 'react';
import '../CSS/Content.css';

const SubjectContent = () => {
  const [topics, setTopics] = useState([
    {
      name: "Topic 1",
      subtopics: ["Subtopic 1.1", "Subtopic 1.2"],
      isOpen: false,
    },
    {
      name: "Topic 2",
      subtopics: ["Subtopic 2.1", "Subtopic 2.2"],
      isOpen: false,
    },
    {
        name: "Topic 3",
        subtopics: ["Subtopic 2.1", "Subtopic 2.2"],
        isOpen: false,
      },
  ]);

  // Function to toggle the dropdown for a topic
  const toggleTopic = (index) => {
    setTopics(
      topics.map((topic, i) =>
        i === index ? { ...topic, isOpen: !topic.isOpen } : topic
      )
    );
  };

  // Function to add a new subtopic to a topic
  const addSubtopic = (index) => {
    const newSubtopic = prompt("Enter new subtopic name:");
    if (newSubtopic) {
      const updatedTopics = [...topics];
      updatedTopics[index].subtopics.push(newSubtopic);
      setTopics(updatedTopics);
    }
  };

  return (
    <div className="subject-content-container">
      <div className="topics-list">
        {topics.map((topic, index) => (
          <div key={index} className="topic-item">
            <div className="topic-header">
              <span className="topic-name" onClick={() => toggleTopic(index)}>
                {topic.name}
              </span>
              <button
                className="add-subtopic-btn"
                onClick={() => addSubtopic(index)}
              >
                + Add Subtopic
              </button>
            </div>
            {topic.isOpen && (
              <div className="subtopics-list">
                {topic.subtopics.map((subtopic, subIndex) => (
                  <div key={subIndex} className="subtopic-item">
                    {subtopic}
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
