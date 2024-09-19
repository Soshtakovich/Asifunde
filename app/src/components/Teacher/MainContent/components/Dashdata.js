//import React, { useState } from 'react';
import React from 'react';
import '../../CSS/Main-small-components-css/Dash.css'

const subjectData = [
    {
        iconClass: 'bx bx-book-content',
        Name: 'Add Assessment',
        label: 'Add a Test or Assignment',
        link: '/' // The link is now used to trigger the modal
    },
    {
        iconClass: 'bx bx-stats',
        Name: 'Check Submissions',
        label: 'Assessments Submitted So Far',
        link: '/'
    },
    {
        iconClass: 'bx bxs-paste',
        Name: 'Add Subject Material',
        label: 'Notes / Worksheet',
        link: '/'
    },
    {
        iconClass: 'bx bxs-speaker',
        Name: 'Send a Message',
        label: 'Make an Announcement',
        link: '/'
    }
];

function SubjectList({ subjectData, onSubjectClick }) {
    return (
        <div>
            <ul className="subject-list">
                {subjectData.map((subject, index) => (
                    <li key={index} onClick={() => onSubjectClick(subject)}>
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

function Dashteacherdata({ onSubjectSelect }) {
    return (
        <div>
            <SubjectList subjectData={subjectData} onSubjectClick={onSubjectSelect} />
        </div>
    );
}

export default Dashteacherdata;
