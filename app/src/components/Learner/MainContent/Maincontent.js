import React from 'react';
import '../CSS/Maincontent.css';
import Path from './small-components/Path';
import Dashboard from './components/Dashboard';

function Maincontent({ content, isSidebarClosed }) {
    // Define which component to render based on the content prop
    const renderContent = () => {
        switch (content) {
            case "Subjects":
                return <div>Subjects Content</div>;
            case "Dashboard":
                return <Dashboard />;
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
        <div className={`main-content ${isSidebarClosed ? 'small' : ''}`}>
            <div className='content-main'>
                <div className='Path'>
                   <Path content={content} />
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
