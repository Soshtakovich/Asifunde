import React, { useState } from 'react';
import Topbar from './components/Learner/Topbar/Topbar';
import Sidebar from './components/Learner/Leftbar/Leftbar';
import Maincontent from './components/Learner/MainContent/Maincontent';

function Learner() {
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
      <Maincontent content={selectedContent} />
    </div>
  );
}

export default Learner;
