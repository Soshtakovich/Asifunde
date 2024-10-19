import React from "react";
import '../../CSS/Main-small-components-css/Assessments.css'
import { assessmentsData, resultsData } from "./assessmentsalldata";

function Assessmentsall({ assessments, results }) {
    return (
        <div className="assessment-related">
            {/* Assessments Table */}
            <div className="assessments-all">
                <div className="header">
                    <i className='bx bx-receipt'></i>
                    <h3>My Assessments</h3>
                    <div className="icons">
                        <i className='bx bx-filter'></i>
                        <i className='bx bx-search'></i>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Day Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessments.map((assessment, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="subject-info">
                                        <img src={assessment.image} alt={assessment.subject} className="subject-image" />
                                        <p>{assessment.subject}</p>
                                    </div>
                                </td>
                                <td>{assessment.dueDate}</td>
                                <td><span className={`status-${assessment.status}`}>{assessment.status}</span></td>
                                <td><span className="days-remaining">{assessment.daysRemaining}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Results List */}
            <div className="results-summary">
                <div className="header">
                    <i className='bx bx-note'></i>
                    <h3>Latest Results</h3>
                    <div className="icons">
                        <i className='bx bx-filter'></i>
                        <i className='bx bx-plus'></i>
                    </div>
                </div>
                <ul className="results-list">
                    {results.map((result, index) => (
                        <li key={index} className={result.statusClass}>
                            <div className="results-title">
                                <i className={`bx ${result.icon}`}></i>
                                <p>{result.title}</p>
                            </div>
                            <i className='bx bx-dots-vertical-rounded'></i>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function Displayassessments() {
    return (
        <Assessmentsall assessments={assessmentsData} results={resultsData} />
    );
}

export default Displayassessments;
