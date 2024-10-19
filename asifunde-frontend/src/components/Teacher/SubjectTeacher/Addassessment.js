import React, { useState } from 'react';

const AddAssessmentPopup = ({ setShowAssessmentPopup }) => {
  const [assessmentData, setAssessmentData] = useState({
    name: '',
    description: '',
    fileLink: null,
    dueDate: '',
    totalMark: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const teacherNumber = sessionStorage.getItem('Teacher_Number'); // Retrieve Teacher_Number from session storage

    const formData = new FormData();
    formData.append('name', assessmentData.name);
    formData.append('description', assessmentData.description);
    formData.append('file', assessmentData.fileLink);
    formData.append('dueDate', assessmentData.dueDate);
    formData.append('totalMark', assessmentData.totalMark);
    formData.append('teacherNumber', teacherNumber); // Append Teacher_Number to form data

    try {
      const response = await fetch('http://localhost:4000/api/addassessments', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        //const result = await response.json();
        //console.log(result); // Handle success (e.g., show notification)
        alert('Assessment added successfully!'); // Alert on success
      } else {
        console.error('Failed to add assessment');
        alert('Failed to add assessment. Please try again.'); // Alert on failure
      }
    } catch (error) {
      console.error('Error adding assessment:', error);
      alert('An error occurred while adding the assessment.');
    }

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
