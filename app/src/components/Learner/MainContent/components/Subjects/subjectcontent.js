import React, { useEffect, useState } from 'react';
import '../../../CSS/Main-small-components-css/Subjectpage.css'; // For styling
import '../../../CSS/Main-small-components-css/Subjectassessments.css';

const Subjectpage = ({ subject }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [subjectsData, setSubjectsData] = useState({
        Content: [],
        Announcements: [],
        Assessments: [] // Initialize Assessments here
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubjectData = async () => {
            const learnerNumber = sessionStorage.getItem('Learner_Number');
            if (!learnerNumber) {
                setError('Learner number not found in session storage.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/api/subjectInfo/${subject.Name}/${learnerNumber}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();

                // Structure the fetched data into the required format
                const formattedData = {
                    Content: data.content,
                    Announcements: data.announcements.map(announcement => ({
                        title: announcement.Content_Heading,
                        description: announcement.Content
                    })),
                    Assessments: data.assessments
                };

                setSubjectsData(formattedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjectData();
    }, [subject.Name]);

    const toggleDropdown = (blockName) => {
        setActiveDropdown(activeDropdown === blockName ? null : blockName);
    };

    const calculateDaysRemaining = (dueDate) => {
        const currentDate = new Date();
        const dueDateObj = new Date(dueDate);
        const differenceInTime = dueDateObj - currentDate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        return differenceInDays >= 0 ? differenceInDays : 'Overdue';
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="subject-page">
            <h2>{subject.Name}</h2>

            {/* Assessments block */}
            <div className="block-container">
                <div
                    className="block"
                    onClick={() => toggleDropdown("Assessments")}
                    style={{ backgroundColor: getColorForBlock("Assessments") }}
                >
                    Assessments
                </div>

                {activeDropdown === "Assessments" && (
                    <div className="dropdown">
                        <table>
                            <thead>
                                <tr>
                                    <th>Assessment Name</th>
                                    <th>Description</th>
                                    <th>File Link</th>
                                    <th>Due Date</th>
                                    <th>Total Mark</th>
                                    <th>Days Remaining</th>
                                    <th>Mark</th>
                                    <th>Submit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjectsData.Assessments.map((assessment, index) => {
                                    const daysRemaining = calculateDaysRemaining(assessment.dueDate);
                                    const isOverdue = daysRemaining === 'Overdue';

                                    return (
                                        <tr key={index}>
                                            <td>{assessment.name}</td>
                                            <td>{assessment.description}</td>
                                            <td><a href={assessment.fileLink} className="download-link">Download</a></td>
                                            <td>{assessment.dueDate}</td>
                                            <td>{assessment.totalMark}</td>
                                            <td><span className={`days-remaining ${isOverdue ? 'overdue' : ''}`}>{daysRemaining}</span></td>
                                            <td>{assessment.mark}</td>
                                            <td>
                                                <button
                                                    className="modern-submit-btn"
                                                    disabled={isOverdue}
                                                    style={{ backgroundColor: isOverdue ? '#d3d3d3' : '#007bff' }}
                                                >
                                                    Submit
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Other blocks */}
            {Object.keys(subjectsData).map((blockName, index) => (
                blockName !== "Assessments" && ( // Exclude the Assessments block
                    <div key={index} className="block-container">
                        <div
                            className="block"
                            onClick={() => toggleDropdown(blockName)}
                            style={{ backgroundColor: getColorForBlock(blockName) }}
                        >
                            {blockName}
                        </div>

                        {activeDropdown === blockName && (
                            <div className="dropdown">
                                {subjectsData[blockName].map((item, idx) => (
                                    <div key={idx} className="dropdown-item">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>

                                        {/* Subtopics as hyperlinks */}
                                        {item.subContent && item.subContent.length > 0 && (
                                            <ul>
                                                {item.subContent.map((subtopic, subIdx) => (
                                                    <li key={subIdx}>
                                                        <a href={subtopic.link}>{subtopic.subTitle}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
            ))}
        </div>
    );
};

const getColorForBlock = (blockName) => {
    switch (blockName) {
        case "Assessments":
            return 'gray';
        case "Content":
            return 'lightgreen';
        case "Announcements":
            return 'lightblue';
        case "Results":
            return 'deepskyblue';
        default:
            return 'white';
    }
};

export default Subjectpage;
