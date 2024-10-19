// Announcementpop.js
import React from 'react';

const Announcementpop = ({ newTopic, setNewTopic, addNewTopic, setShowTopicPopup }) => {
  return (
    <div className="popup-form">
      <form onSubmit={addNewTopic}>
        <label>
          Announcemnet Title:
          <input
            type="text"
            value={newTopic.name}
            onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
            required
          />
        </label>
        <label>
          Announcemnt Meassage:
          <input
            type="text"
            value={newTopic.subtopic}
            onChange={(e) => setNewTopic({ ...newTopic, subtopic: e.target.value })}
            required
          />
        </label>

        <button type="submit">Add Announcement</button>
        <button type="button" onClick={() => setShowTopicPopup(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default Announcementpop;

