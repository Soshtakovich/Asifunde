import React, { useState, useEffect } from 'react';
import '../CSS/Content.css';
import AddTopicPopup from './Addtopic'; // Import the popup

const SubjectContent = () => {
  const [topics, setTopics] = useState([]);
  const [showTopicPopup, setShowTopicPopup] = useState(false);
  const [newTopic, setNewTopic] = useState({ name: "", subtopic: "", notes: null, worksheet: null });

  useEffect(() => {
    const fetchContent = async () => {
      const teacherNumber = sessionStorage.getItem('Teacher_Number');

      try {
        const response = await fetch(`http://localhost:4000/api/content/${teacherNumber}`);
        if (!response.ok) throw new Error('Failed to fetch content');

        const contentData = await response.json();
        console.log(contentData);

        const formattedTopics = Array.isArray(contentData)
          ? contentData.map(content => ({
              contentId: content.Content_ID,
              name: content.Title,
              subtopics: content.Sub_Content.map(sub => ({
                name: sub.Sub_Title,
                notes: sub.Link,
                worksheet: null,
              })),
              isOpen: false,
            }))
          : [];

        setTopics(formattedTopics);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  const toggleTopic = (index) => {
    const updatedTopics = [...topics];
    updatedTopics[index].isOpen = !updatedTopics[index].isOpen;
    setTopics(updatedTopics);
  };

  return (
    <div className="subject-content-container">
      <button className="add-topic-btn" onClick={() => setShowTopicPopup(true)}>
        + Add Topic
      </button>

      {showTopicPopup && (
        <AddTopicPopup
          newTopic={newTopic}
          setNewTopic={setNewTopic}
          setShowTopicPopup={setShowTopicPopup}
          setTopics={setTopics} // Pass setTopics to the popup
          topics={topics} // Pass current topics for updates
        />
      )}

      <div className="topics-list">
        {topics.map((topic, index) => (
          <div key={index} className="topic-item">
            <div className="topic-header" onClick={() => toggleTopic(index)}>
              <span className="topic-name">{topic.name}</span>
            </div>
            {topic.isOpen && (
              <div className="subtopics-list">
                {topic.subtopics.map((sub, subIndex) => (
                  <div key={subIndex} className="subtopic-item">
                    {sub.name} - <a href={sub.notes}>Notes</a>
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
