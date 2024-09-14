import React, { useState } from 'react';
import Subjectslistdata from '../small-components/Subjectlistdata';
import Displayassessments from '../small-components/Assessmentsall';
import Subjectpage from './Subjects/subjectcontent'; // Import Subjectpage
import '../../CSS/Main-small-components-css/Subjectlist.css';
import '../../CSS/Main-small-components-css/Dash.css';

function Subjects() {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const back_butt = "<< Back to Subjects";

    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject); // Set the subject when selected
        // Update the path
    };

    const handleBackClick = () => {
        setSelectedSubject(null); // Reset the selected subject to go back to the list
       // Update the path to "Subjects"
    };

    return (
        <div>
            {/* Conditionally render either the subject list or the subject page */}
            {selectedSubject ? (
                <div>
                    <div className="back-button-wrapper">
                        <button onClick={handleBackClick} className="Subject-Back">{back_butt}</button>
                    </div>
                    <Subjectpage subject={selectedSubject} /> {/* Pass the selected subject to Subjectpage */}
                </div>
            ) : (
                <>
                    <Subjectslistdata onSubjectSelect={handleSubjectSelect} />
                    <Displayassessments />
                </>
            )}
        </div>
    );
}

export default Subjects;
