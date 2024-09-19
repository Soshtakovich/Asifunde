import React from 'react';
import '../css/MainContent.css';
import Insights from './small-components/Insights';
import BottomData from './small-components/Top-Lowest';
import CourseList from './small-components/subject';
import LearnerList from './small-components/Learnerlist';
import AssessmentsTable from './small-components/Classporgress';
import Assessments from './small-components/Assessment';
import Path from '../Learner/Path';


function MainContent({ content, assessments, results, isSidebarClosed, config }) {
    const sidebarWidth = isSidebarClosed ? config.sidebarClosedWidth : config.sidebarWidth;
    const navWidth = isSidebarClosed ? config.sidebarClosedWidth : config.sidebarWidth;

    // Define which component to render based on the content prop
    const renderContent = () => {
        switch (content) {

            case "Dashboard":
                return <Insights />;

            default:
                return <div>{content} Functionality: Not implemented yet</div>; // Fallback content
        }
    };

    return (
        <div className="main" style={{ marginLeft: sidebarWidth, width: `calc(98% - ${navWidth})` }}>
            <Path content={content} />
            {renderContent()}
        </div>
    );
}

export default MainContent;
