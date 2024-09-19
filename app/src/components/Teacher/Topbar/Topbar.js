import React, { useState } from 'react';
import '../CSS/Topbar.css';

function Topbar({ toggleSidebar, isSidebarClosed }) {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  const handleSearchToggle = () => setSearchVisible(!isSearchVisible);

  const handleThemeToggle = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  return (
    <nav className={`navbar ${isSidebarClosed ? 'small' : ''}`}>
      <div className="navbar-content">
        {/* Menu icon */}
        <div className='menu-toggle'>
          <i className='bx bx-menu' onClick={toggleSidebar}></i>
        </div>

        {/* Theme toggle button */}
        <button className="theme-toggle" onClick={handleThemeToggle}>
          <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`}></i>
        </button>

        {/* Search toggle button */}
        <button className="search-toggle" onClick={handleSearchToggle}>
          <i className={`bx ${isSearchVisible ? 'bx-x' : 'bx-search'}`}></i>
        </button>

        {/* Search form */}
        {isSearchVisible && (
          <form className="search-form">
            <input type="search" placeholder="Search..." />
          </form>
        )}

        {/* Notification icon */}
        <a href="/" className="notification">
          <i className='bx bx-bell'></i>
          <span className="notification-count">5</span>
        </a>

        {/* Profile image */}
        <a href="/" className="profile">
          <img src="/images/logo.png" alt="Profile" />
        </a>
      </div>
    </nav>
  );
}

export default Topbar;
