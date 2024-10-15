import React, { useState, useEffect } from 'react';


function Submissions({ assessments }) {
    const calculateDaysRemaining = (dueDate) => {
        const currentDate = new Date();
        const dueDateObj = new Date(dueDate);
        const differenceInTime = dueDateObj - currentDate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays >= 0 ? differenceInDays : 'Overdue';
    };

    return (
        <div className="assessment-container">
            <div className="assessments-table">
                <div className="header">
                    <h3>Assessments</h3>
                </div>
                <table>
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Total Mark</th>
                            <th>Days Remaining</th>
                            <th>Submissions</th>
                            <th>Not Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessments.map((assessment, index) => {
                            const daysRemaining = calculateDaysRemaining(assessment.dueDate);
                            const isOverdue = daysRemaining === 'Overdue';
                            const total_Learners = sessionStorage.getItem('Total_Learners');
                            const submitted = assessment.submissions;

                            return (
                                <tr key={index}>
                                    <td>{assessment.name}</td>
                                    <td>{assessment.totalMark}</td>

                                    <td><span className={`days-remaining ${isOverdue ? 'overdue' : ''}`}>{daysRemaining}</span></td>
                                    <td>{assessment.submissions}</td>
                                    <td>{total_Learners-submitted}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Displaysubmissions() {
    const [showAssessmentPopup, setShowAssessmentPopup] = useState(false);
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        const fetchAssessments = async () => {
            const teacherNumber = sessionStorage.getItem('Teacher_Number');

            if (!teacherNumber) {
                console.error('Teacher_Number not found in session storage');
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/api/assessments/${teacherNumber}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch assessments');
                }
                const data = await response.json();
                setAssessments(data);
            } catch (error) {
                console.error('Error fetching assessments:', error);
            }
        };

        fetchAssessments();
    }, []);

    const addAssessment = async (assessmentData) => {
        // Handle saving the assessment to your database here.
        console.log("New assessment added:", assessmentData);
    };

    return (
        <>
        {/*
            <button className="add-topic-btn" onClick={() => setShowAssessmentPopup(true)}>
                + Add Assessment
            </button>

            {showAssessmentPopup && (
                <AddAssessmentPopup
                    setShowAssessmentPopup={setShowAssessmentPopup}
                    addAssessment={addAssessment}
                />
            )}

            */}

            <Submissions assessments={assessments} />
        </>
    );
}

export default Displaysubmissions;
