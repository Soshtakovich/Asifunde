import React, { useState } from 'react';

const AddTopicPopup = ({ newTopic, setNewTopic, setShowTopicPopup, setTopics, topics }) => {
  const [description, setDescription] = useState("");

  const handleAddContent = async (e) => {
    e.preventDefault();

    const teacherNumber = sessionStorage.getItem('Teacher_Number');

    try {
      const response = await fetch('http://localhost:4000/api/addContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTopic.name,
          description: description,
          teacherNumber: teacherNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add content');
        
      }

      //const result = await response.json();
      //console.log(result); // Log for debugging

      // Add the new topic to the existing topics list
      const updatedTopics = [...topics, { name: newTopic.name, subtopics: [], isOpen: false }];
      setTopics(updatedTopics); // Update state immediately

      // Reset inputs and close the popup
      setNewTopic({ name: "", subtopic: "" });
      setDescription("");
      setShowTopicPopup(false);
      alert('Content added successfully');
    } catch (error) {
      console.error('Error adding content:', error);
      alert('Error adding content');
    }
  };

  return (
    <div className="popup-form">
      <form onSubmit={handleAddContent}>
        <label>
          Topic Name / Title:
          <input
            type="text"
            value={newTopic.name}
            onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <button type="submit">Add Topic</button>
        <button type="button" onClick={() => setShowTopicPopup(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTopicPopup;
