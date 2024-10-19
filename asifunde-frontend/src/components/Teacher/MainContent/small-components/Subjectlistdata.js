//import React, { useState } from 'react';
import React from 'react';


const subjectData = [
    {
        iconClass: 'bx bx-math',
        Name: 'Mathematics',
        label: 'Absent',
        link: '/' // The link is now used to trigger the modal
    },
    {
        iconClass: 'bx bxl-sketch',
        Name: 'Physical Sciences',
        label: 'Assessments completed',
        link: '/'
    },
    {
        iconClass: 'bx bxs-doughnut-chart',
        Name: 'BET',
        label: 'Average',
        link: '/'
    },
    {
        iconClass: 'bx bx-laptop',
        Name: 'Computer Skills',
        label: 'Program Score',
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
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Subjectslistdata({ onSubjectSelect }) {
    return (
        <div>
            <SubjectList subjectData={subjectData} onSubjectClick={onSubjectSelect} />
        </div>
    );
}

export default Subjectslistdata;
