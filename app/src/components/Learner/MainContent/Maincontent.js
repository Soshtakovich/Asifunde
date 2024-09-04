import React from 'react';
import '../CSS/Maincontent.css';
import Path from './small-components/Path';

function Maincontent({ content }) {
    // Define which component to render based on the content prop
    const renderContent = () => {
        switch (content) {
            case "Subjects":
                return <div>Subjects Content</div>;
            case "Dashboard":
                return <div>Dashboard Content</div>;
            case "Assessments":
                return <div>Assessments Content</div>;
            case "Progress":
                return <div>Progress Content</div>;
            case "Groups":
                return <div>Groups Content</div>;
            case "Notifications":
                return <div>Notifications Content</div>;
            case "Settings":
                return <div>Settings Content</div>;
            default:
                return <div>No Content</div>; // Fallback content
        }
    };

    return (
        <div className="main-content">
            <Path content={content} />
            {renderContent()}
        </div>
    );
}

export default Maincontent;
