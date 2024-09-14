import React from 'react';
import '../../CSS/Main-small-components-css/Subjectlist.css';
import Subjectslistdata from '../small-components/Subjectlistdata'; 
import Displayassessments from '../small-components/Assessmentsall';
import '../../CSS/Main-small-components-css/Dash.css'


function Subjects() {
    return (
        <>
            <Subjectslistdata />
            <Displayassessments/>
        </>
    );
}

export default Subjects;
