import React, { useState } from 'react';
import '../css/subject.css'; // Ensure this file contains the required styles

const CourseItem = ({ course, onSelect }) => {
    return (
        <div className="course-item" onClick={() => onSelect(course)}>
            <div className="course-info">
                <img src={course.image} alt={course.title} />
                <div>
                    <h3>{course.title}</h3>
                    <p>Duration : {course.duration}</p>
                    <p>Grade : {course.level}</p>
                    <p>Number of Learners : {course.students}</p>
                    <p>Subject Status : {course.status}</p>
                </div>
            </div>
        </div>
    );
};

const Dropdown = ({ onOptionSelect, onClose }) => {
    return (
        <div className="dropdown">
            <button className="close-btn" onClick={onClose}>X</button>
            <ul>
                <li onClick={() => onOptionSelect('Add Material')}>Add Material</li>
                <li onClick={() => onOptionSelect('Add Assessment')}>Add Assessment</li>
                <li onClick={() => onOptionSelect('Send Announcement')}>Send Announcement</li>
            </ul>
        </div>
    );
};

const Modal = ({ title, inputs, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{title}</h2>
                {inputs.map(input => (
                    <div key={input} className="input-group">
                        <label>{input}</label>
                        <input type="text" name={input} onChange={handleChange} />
                    </div>
                ))}
                {title !== "Send Announcement" && (
                    <div className="input-group">
                        <label>Upload Assessment File</label>
                        <input type="file" />
                    </div>
                )}
                <div className="button-container">
                    <button className='confirm' onClick={() => onSubmit(formData)}>Confirm</button>
                    <button className='close-' onClick={onClose}>Close</button>
                </div>

            </div>
        </div>
    );
};

const CourseList = () => {
    // eslint-disable-next-line no-unused-vars
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modalInfo, setModalInfo] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const courses = [
        {
            title: "Mathematics",
            duration: "11 Months",
            level: "Grade 12",
            students: 30,
            rating: 4.5,
            reviews: 20,
            status: "In Progress",
            image: "/images/subjects/maths.jpg",
        },
        {
            title: "Physical Sciences",
            duration: "11 Months",
            level: "Grade 10",
            students: 30,
            rating: 4.5,
            reviews: 20,
            status: "In Progress",
            image: "/images/subjects/physical-sciences.jpg",
        },
        // Add more courses as needed
    ];

    const handleSelectCourse = (course) => {
        setSelectedCourse(course);
        setIsDropdownOpen(true);
    };

    const handleOptionSelect = (option) => {
        let inputs = [];
        if (option === 'Add Material' || option === 'Add Assessment') {
            inputs = ['Topic', 'Type', 'Description'];
        } else if (option === 'Send Announcement') {
            inputs = ['Title', 'Description', 'Content'];
        }

        setModalInfo({ title: option, inputs });
        setIsDropdownOpen(false); // Close dropdown after selecting an option
    };

    const handleCloseModal = () => {
        setModalInfo(null);
    };

    const handleSubmitModal = (formData) => {
        console.log('Submitted Data:', formData);
        handleCloseModal();
    };

    const handleCloseDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <div className="course-list">
            {courses.map((course) => (
                <CourseItem key={course.title} course={course} onSelect={handleSelectCourse} />
            ))}
            {isDropdownOpen && (
                <Dropdown
                    onOptionSelect={handleOptionSelect}
                    onClose={handleCloseDropdown}
                />
            )}
            {modalInfo && (
                <Modal
                    title={modalInfo.title}
                    inputs={modalInfo.inputs}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitModal}
                />
            )}
        </div>
    );
};

export default CourseList;
