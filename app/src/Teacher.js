import React, { useState } from 'react';
import Sidebar from './components/Teacher/Leftbar/Leftbar';
import Topbar from './components/Teacher/Topbar/Topbar';
import Maincontent from './components/Teacher/MainContent/Maincontent';

function Teacher() {
    const [content, setContent] = useState('Dashboard'); // Start with Dashboard
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);

    const handleContentSelect = (newContent) => {
        setContent(newContent); // Update the content based on user selection
    };

    const toggleSidebar = () => {
        setIsSidebarClosed(!isSidebarClosed);
    };

    return (
        <div className="learner">
            <Topbar toggleSidebar={toggleSidebar} isSidebarClosed={isSidebarClosed} />
            <Sidebar 
                setContent={handleContentSelect} // Pass the content selection function
                isSidebarClosed={isSidebarClosed} 
            />
            <Maincontent 
                content={content} 
                isSidebarClosed={isSidebarClosed} 
                onContentSelect={handleContentSelect} // Pass the handler here
            />
        </div>
    );
}

export default Teacher;
