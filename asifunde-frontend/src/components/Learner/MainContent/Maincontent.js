import React from 'react';
import '../CSS/Maincontent.css';
import Path from './small-components/Path';
import Dashboard from './components/Dashboard';
import Subjects from './components/Subjects';
import Assessments from './components/Assessments';
import LearnerProgress from './components/Progress';
import Announcements from './components/Announcements';

function Maincontent({ content, isSidebarClosed }) {

    // Define which component to render based on the content prop
    const renderContent = () => {
        switch (content) {
            case "Subjects":
                return <Subjects  />; // Pass updatePath to Subjects
            case "Dashboard":
                return <Dashboard />;
            case "Assessments":
                return <Assessments/>;
            case "Progress":
                return <LearnerProgress/>;
            case "Groups":
                return <div>Groups Content</div>;
            case "Announcements":
                return <Announcements/>;
            case "Settings":
                return <div>Settings Content</div>;
            default:
                return <div>No Content</div>; // Fallback content
        }
    };

    return (
        <div className={`main-content ${isSidebarClosed ? 'small' : ''}`}>
            <div className='content-main'>
                <div className='Path'>
                    <Path content={content} /> {/* Pass the current path */}
                </div>

                <div className='top-border-main-content'>
                    
                </div>

                <div className='clicked-content'>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Maincontent;
