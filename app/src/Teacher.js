import React, { useState } from 'react';
import Sidebar from './components/Teacher/Leftbar/Leftbar';
import Topbar from './components/Teacher/Topbar/Topbar';
import Maincontent from './components/Teacher/MainContent/Maincontent';



function Teacher() {

    const [selectedContent, setSelectedContent] = useState('Dashboard');
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarClosed(!isSidebarClosed);
    };
  
    return (
      <div className="learner">
        <Topbar toggleSidebar={toggleSidebar} isSidebarClosed={isSidebarClosed} />
        <Sidebar 
          setContent={setSelectedContent} 
          isSidebarClosed={isSidebarClosed} 
        />
        <Maincontent content={selectedContent} isSidebarClosed={isSidebarClosed} />
      </div>
    );
}

export default Teacher;
