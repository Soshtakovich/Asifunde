import React from 'react';
import subjectData from './Dashdata'; // Import subject data
import '../../CSS/Main-small-components-css/Dash.css';

function Dashboard({ onContentSelect }) { // Receiving the function to send data back
    return (
        <div className="dashboard-container">
            <ul className="subject-list">
                {subjectData.map((subject, index) => (
                    <li 
                        key={index} 
                        onClick={() => onContentSelect(subject.link)} // Pass subject selection back to Maincontent
                    >
                        <i className={subject.iconClass}></i>
                        <span className="subject-info">
                            <h3 className='subject-heading'>{subject.Name}</h3>
                            <p className='dash-script'>{subject.label}</p>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
