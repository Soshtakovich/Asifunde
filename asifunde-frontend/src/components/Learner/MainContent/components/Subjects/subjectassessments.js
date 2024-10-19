import React from "react";
import '../../../CSS/Main-small-components-css/Subjectassessments.css';
import { subjectassessmentsData } from "./subjectassessmentsdata";

function SubjectAssessments({ assessments }) {
    const calculateDaysRemaining = (dueDate) => {
        const currentDate = new Date();
        const dueDateObj = new Date(dueDate);
        const differenceInTime = dueDateObj - currentDate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        return differenceInDays >= 0 ? differenceInDays : 'Overdue';
    };

    return (
        <div className="modern-assessment-container">
            {/* Assessments Table */}
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
                            <th>Assessment Name</th>
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

                            return (
                                <tr key={index}>
                                    <td>{assessment.subject}</td>
                                    <td>{assessment.description}</td>
                                    <td><a href={assessment.fileLink} className="download-link">Download</a></td>
                                    <td>{assessment.dueDate}</td>
                                    <td>{assessment.totalMark}</td>
                                    <td><span className={`days-remaining ${isOverdue ? 'overdue' : ''}`}>{daysRemaining}</span></td>
                                    <td>{assessment.mark}</td>
                                    <td>
                                        <button
                                            className="modern-submit-btn"
                                            disabled={isOverdue}
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
        </div>
    );
}

function Displaysubjectassessments() {
    return <SubjectAssessments assessments={subjectassessmentsData} />;
}

export default Displaysubjectassessments;
