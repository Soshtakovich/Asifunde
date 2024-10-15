import React, { useEffect, useState } from "react";
import '../../CSS/Main-small-components-css/Assessments.css';
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
                                <td>
                                    <span className={`status-${assessment.statusClass}`}>
                                        {assessment.status}
                                    </span>
                                </td>
                                <td><span className="days-remaining">{assessment.daysRemaining}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Results List */}
          {/*
           
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
          
          */}  
        </div>
    );
}

function Displayassessments() {
    const [assessments, setAssessments] = useState([]); // Store assessments data
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchAssessments = async () => {
            const data = await assessmentsData(); // Await fetched data
            setAssessments(data); // Update state with the fetched data
            setLoading(false); // Set loading to false once data is fetched
        };

        fetchAssessments(); // Call fetch function
    }, []);

    if (loading) {
        return <p>Loading assessments...</p>; // Show loading message
    }

    return <Assessmentsall assessments={assessments} results={resultsData} />;
}

export default Displayassessments;
