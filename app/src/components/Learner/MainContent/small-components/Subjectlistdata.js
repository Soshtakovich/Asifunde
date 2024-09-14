import React, { useState } from 'react';
import Displaysubjectassessments from '../components/Subjects/subjectassessments';  // Import the assessments component

const subjectData = [
    {
        iconClass: 'bx bx-math',
        value: 'Mathematics',
        label: 'Absent',
        link: '/' // The link is now used to trigger the modal
    },
    {
        iconClass: 'bx bxl-sketch',
        value: 'Physical Sciences',
        label: 'Assessments completed',
        link: '/'
    },
    {
        iconClass: 'bx bxs-doughnut-chart',
        value: 'BET',
        label: 'Average',
        link: '/'
    },
    {
        iconClass: 'bx bx-laptop',
        value: 'Computer Skills',
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
                            <h3 className='subject-heading'>{subject.value}</h3>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Subjectslistdata() {
    const [showModal, setShowModal] = useState(false);

    const handleSubjectClick = (subject) => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <SubjectList subjectData={subjectData} onSubjectClick={handleSubjectClick} />

            {/* Modal popup */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal-btn" onClick={closeModal}>X</button>
                        <Displaysubjectassessments /> {/* Display the assessments inside the modal */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Subjectslistdata;
