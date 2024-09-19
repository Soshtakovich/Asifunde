import React from 'react';

const insightsData = [
    {
        icon: 'bx bx-book-content',
        heading: 'Add An Assessment',
        description: 'Absent',
        action: 'addAssessment' // Placeholder action
    },
    {
        icon: 'bx bx-stats',
        heading: 'Check Submissions',
        description: 'Assessments Submitted So Far',
        action: 'checkSubmissions' // Placeholder action
    },
    {
        icon: 'bx bxs-paste',
        heading: 'Add Course Material',
        description: 'Notes / Worksheet',
        action: 'addMaterial' // Placeholder action
    },
    {
        icon: 'bx bxs-speaker',
        heading: 'Announce',
        description: 'Send message to your class(es)',
        action: 'sendAnnouncement' // Placeholder action
    }
];

function Insights() {
    // Placeholder function to handle clicks
    const handleClick = (action) => {
        console.log(`Clicked on: ${action}`);
        // Future implementation: Scroll to the corresponding section or trigger a specific function
    };

    return (
        <ul className="insights">
            {insightsData.map((insight, index) => (
                <li key={index} onClick={() => handleClick(insight.action)}>
                    <i className={insight.icon}></i>
                    <span className="info">
                        <h3 className='insights-heading'>{insight.heading}</h3>
                        <p>{insight.description}</p>
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default Insights;

