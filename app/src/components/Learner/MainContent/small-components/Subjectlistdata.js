import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SubjectList({ subjectData, onSubjectClick }) {
    return (
        <div>
            <ul className="subject-list">
                {subjectData.map((subject, index) => (
                    <li key={index} onClick={() => onSubjectClick(subject)}>
                        <i className={subject.iconClass}></i>
                        <span className="subject-info">
                            <h3 className="subject-heading">{subject.Name}</h3>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Subjectslistdata({ onSubjectSelect }) {
    const [subjectData, setSubjectData] = useState([]);

    useEffect(() => {
        const learnerNumber = sessionStorage.getItem('Learner_Number'); // Get learner number from session storage

        axios
            .get(`http://localhost:4000/api/subjectList/${learnerNumber}`)
            .then((response) => {
                setSubjectData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching subjects:', error);
            });
    }, []);

    return (
        <div>
            <SubjectList subjectData={subjectData} onSubjectClick={onSubjectSelect} />
        </div>
    );
}

export default Subjectslistdata;
