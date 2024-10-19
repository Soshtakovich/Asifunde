import React, { useEffect, useState } from "react";
import '../../../CSS/Main-small-components-css/Subjectassessments.css';
import '../../../../Teacher/CSS/Content.css';
import { subjectassessmentsData } from "./assessmentspagedata";

function Assessmentspage({ assessments }) {
    const [showSubmissionPopup, setShowSubmissionPopup] = useState(false); 
    const [selectedAssessmentId, setSelectedAssessmentId] = useState(null); 
    const [uploadedFile, setUploadedFile] = useState(null); 

    const calculateDaysRemaining = (dueDate) => {
        const currentDate = new Date();
        const dueDateObj = new Date(dueDate);
        const differenceInTime = dueDateObj - currentDate;
        return differenceInTime >= 0 
            ? Math.ceil(differenceInTime / (1000 * 3600 * 24)) 
            : 'Overdue';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Learner_Number = sessionStorage.getItem('Learner_Number');
        
        if (!selectedAssessmentId) {
            alert('Assessment ID is missing!');
            console.error('Submission Error: No assessment ID selected.');
            return;
        }

        console.log('Submitting Assessment ID:', selectedAssessmentId);

        const formData = new FormData();
        formData.append('file', uploadedFile);
        formData.append('Learner_Number', Learner_Number);

        try {
            const response = await fetch(`http://localhost:4000/api/submitassessment/${selectedAssessmentId}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Assessment submitted successfully!');
                setShowSubmissionPopup(false);
                setUploadedFile(null);
            } else {
                const errorText = await response.text();
                console.error(`Submission Failed: ${errorText}`);
                alert('Failed to submit assessment.');
            }
        } catch (error) {
            console.error('Error during submission:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const openSubmissionPopup = (assessmentId) => {
        if (!assessmentId) {
            alert('Assessment ID is missing!');
            console.error('Open Popup Error: No assessment ID provided.');
            return;
        }

        console.log('Opening popup for Assessment ID:', assessmentId);
        setSelectedAssessmentId(assessmentId);
        setShowSubmissionPopup(true);
    };

    const closeSubmissionPopup = () => {
        setShowSubmissionPopup(false);
        setUploadedFile(null);
    };

    return (
        <div className="modern-assessment-container">
            <div className="modern-assessments-table">
                <div className="modern-header">
                    <i className='bx bx-receipt'></i>
                    <h3>My Assessments</h3>
                    <div className="modern-icons">
                        <i className='bx bx-filter'></i>
                        <i className='bx bx-search'></i>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>File Link</th>
                            <th>Due Date</th>
                            <th>Total Mark</th>
                            <th>Days Remaining</th>
                            <th>Mark</th>
                            <th>Submit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessments.map((assessment, index) => {
                            const daysRemaining = calculateDaysRemaining(assessment.dueDate);
                            const isOverdue = daysRemaining === 'Overdue';

                            console.log(`Assessment ${index + 1}:`, assessment);

                            if (!assessment.Assessment_ID) {
                                console.warn(`Warning: Missing Assessment_ID for assessment ${index + 1}`);
                            }

                            return (
                                <tr key={index}>
                                    <td>{assessment.name}</td>
                                    <td>{assessment.description}</td>
                                    <td>
                                        <a href={assessment.fileLink} className="download-link">
                                            Download
                                        </a>
                                    </td>
                                    <td>{assessment.dueDate}</td>
                                    <td>{assessment.totalMark}</td>
                                    <td>
                                        <span className={`days-remaining ${isOverdue ? 'overdue' : ''}`}>
                                            {daysRemaining}
                                        </span>
                                    </td>
                                    <td>{assessment.mark}</td>
                                    <td>
                                        <button
                                            className="modern-submit-btn"
                                            disabled={isOverdue || !assessment.Assessment_ID}
                                            onClick={() => openSubmissionPopup(assessment.Assessment_ID)}
                                            style={{ backgroundColor: isOverdue ? '#d3d3d3' : '#007bff' }}
                                        >
                                            Submit
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {showSubmissionPopup && (
                <div className="popup-form">
                    <form onSubmit={handleSubmit}>
                        <label>
                            UPLOAD YOUR ASSESSMENT IN PDF:
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setUploadedFile(e.target.files[0])}
                                required
                            />
                        </label>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={closeSubmissionPopup}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

function Displaysubjectassessmentpage() {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const data = await subjectassessmentsData();
                console.log('Fetched Assessments:', data);
                setAssessments(data);
            } catch (error) {
                console.error('Error fetching assessments:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAssessments();
    }, []);

    if (loading) return <p>Loading assessments...</p>;

    return <Assessmentspage assessments={assessments} />;
}

export default Displaysubjectassessmentpage;
