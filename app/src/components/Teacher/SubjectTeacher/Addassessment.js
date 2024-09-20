import React, { useState } from 'react';

const AddAssessmentPopup = ({ setShowAssessmentPopup, addAssessment }) => {
  const [assessmentData, setAssessmentData] = useState({
    name: '',
    description: '',
    fileLink: null,
    dueDate: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Call the function to add the assessment to the database
    await addAssessment(assessmentData);

    // Close the popup after submitting
    setShowAssessmentPopup(false);
  };

  return (
    <div className="popup-form">
      <form onSubmit={handleFormSubmit}>
        <label>
          Assessment Name:
          <input
            type="text"
            value={assessmentData.name}
            onChange={(e) => setAssessmentData({ ...assessmentData, name: e.target.value })}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={assessmentData.description}
            onChange={(e) => setAssessmentData({ ...assessmentData, description: e.target.value })}
            required
          />
        </label>
        <label>
          Upload PDF (File Link):
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setAssessmentData({ ...assessmentData, fileLink: e.target.files[0] })}
            required
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            value={assessmentData.dueDate}
            onChange={(e) => setAssessmentData({ ...assessmentData, dueDate: e.target.value })}
            required
          />
        </label>
        <label>
          Total Mark:
          <input
            type="number"
            value={assessmentData.totalMark}
            onChange={(e) => setAssessmentData({ ...assessmentData, totalMark: e.target.value })}
            required
          />
        </label>
        <button type="submit">Add Assessment</button>
        <button type="button" onClick={() => setShowAssessmentPopup(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default AddAssessmentPopup;
