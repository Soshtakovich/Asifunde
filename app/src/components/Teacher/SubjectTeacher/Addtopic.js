// AddTopicPopup.js
import React from 'react';

const AddTopicPopup = ({ newTopic, setNewTopic, addNewTopic, setShowTopicPopup }) => {
  return (
    <div className="popup-form">
      <form onSubmit={addNewTopic}>
        <label>
          Topic Name:
          <input
            type="text"
            value={newTopic.name}
            onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
            required
          />
        </label>
        <label>
          Subtopic Name:
          <input
            type="text"
            value={newTopic.subtopic}
            onChange={(e) => setNewTopic({ ...newTopic, subtopic: e.target.value })}
            required
          />
        </label>
        <label>
          Upload Notes:
          <input
            type="file"
            onChange={(e) => setNewTopic({ ...newTopic, notes: e.target.files[0] })}
          />
        </label>
        <label>
          Upload Worksheet:
          <input
            type="file"
            onChange={(e) => setNewTopic({ ...newTopic, worksheet: e.target.files[0] })}
          />
        </label>
        <button type="submit">Add Topic</button>
        <button type="button" onClick={() => setShowTopicPopup(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default AddTopicPopup;
