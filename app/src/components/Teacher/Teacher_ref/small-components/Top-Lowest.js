import React from 'react';
import '../css/dash.css';

const assessmentsData = [
    { subject: "Mathematics", image: "/images/subjects/maths.jpg", dueDate: "14-08-2023", status: "Completed", statusClass: "completed", daysRemaining: 5 },
    { subject: "Physical Sciences", image: "/images/subjects/physical-sciences.jpg", dueDate: "14-08-2023", status: "Not Started", statusClass: "pending", daysRemaining: 5 },
    { subject: "English", image: "/images/subjects/english.jpeg", dueDate: "14-08-2023", status: "Incomplete", statusClass: "process", daysRemaining: 5 },
    { subject: "Computer Skills", image: "/images/subjects/computer.jpg", dueDate: "14-08-2023", status: "Completed", statusClass: "completed", daysRemaining: 5 },
    { subject: "BET", image: "/images/subjects/english.jpeg", dueDate: "14-08-2023", status: "Incomplete", statusClass: "process", daysRemaining: 5 }
];

const topLearners = [
    { name: "Alice Smith", school: "Westi High", number: "12345", average: "90%", stdDev: "5" },
    { name: "Bob Johnson", school: "Riverside School", number: "12346", average: "88%", stdDev: "6" },
    { name: "Charlie Brown", school: "Carlton Academy", number: "12347", average: "85%", stdDev: "7" },
    { name: "Diana Prince", school: "Lakeside College", number: "12348", average: "84%", stdDev: "6" },
    { name: "Eve Adams", school: "Hilltop School", number: "12349", average: "83%", stdDev: "8" }
];

function AssessmentTables() {
    return (
        <div className="assessment-tables">
            {/* My Assessments Table */}
            <div className="orders">
                <div className="header">
                    <i className='bx bx-receipt'></i>
                    <h3>My Assessments</h3>
                    <i className='bx bx-filter'></i>
                    <i className='bx bx-search'></i>
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
                        {assessmentsData.map((assessment, index) => (
                            <tr key={index}>
                                <td>
                                    <p>{assessment.subject}</p>
                                </td>
                                <td className="due-date">{assessment.dueDate}</td>
                                <td><span className={`status ${assessment.statusClass}`}>{assessment.status}</span></td>
                                <td><span className={`status ${assessment.statusClass}`}>{assessment.daysRemaining}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>  
        </div>
    );
}


function Reminders() {
    return (
        <div className="reminders">
            <div className="header">
                <i className='bx bx-note'></i>
                <h3>Top 5 Learners</h3>
                <i className='bx bx-filter'></i>
                <i className='bx bx-plus'></i>
            </div>
            <ul className="task-list">
                <li className="header-row">
                    <div className="task-title">
                        <p><strong>Name</strong></p>
                        <p><strong>Average</strong></p>
                        <p><strong>Std Dev</strong></p>
                        <p><strong>School</strong></p>
                        <p><strong>Learner Number</strong></p>

                    </div>
                </li>
                {topLearners.map((learner, index) => (
                    <li key={index} className="top-learner">
                        <div className="task-title">
                            <p>{learner.name}</p>
                            <p>{learner.average}</p>
                            <p>{learner.stdDev}</p>
                            <p>{learner.school}</p>
                            <p>{learner.number}</p>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}



function BottomData(){
    return (
        <>    

        <AssessmentTables/>
        <Reminders/>
        
        </>


    );
}

export default BottomData;


