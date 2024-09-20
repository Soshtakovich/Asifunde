import React from 'react';
import subjectData from './Dashdata'; // Import the data from Dashdata.js
import '../../CSS/Main-small-components-css/Dash.css';

function Dashboard() {

    return (
        <div className="dashboard-container">
            {/* Menu list */}
            <ul className="subject-list">
                {subjectData.map((subject, index) => (
                    <li key={index} >
                        <i className={subject.iconClass}></i>
                        <span className="subject-info">
                            <h3 className='subject-heading'>{subject.Name}</h3>
                            <p className='dash-script'>{subject.label}</p>
                        </span>
                    </li>
                ))}
            </ul>

            {/* Render the selected content */}

        </div>
    );
}

export default Dashboard;
