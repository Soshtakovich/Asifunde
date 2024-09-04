import React, { useState } from 'react';
import Topbar from './components/Learner/Topbar/Topbar';
import Sidebar from './components/Learner/Leftbar/Leftbar';

function Learner() {
  const [isSidebarClosed, setSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className="learner">
      <Topbar toggleSidebar={toggleSidebar} isSidebarClosed={isSidebarClosed} />
      <Sidebar isSidebarClosed={isSidebarClosed} />
    </div>
  );
}

export default Learner;
