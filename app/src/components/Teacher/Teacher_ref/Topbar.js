import React, { useState, useEffect } from 'react';
import '../css/TopNavbar.css';
import 'boxicons/css/boxicons.min.css';

function TopNavbar({ toggleSidebar, isSidebarClosed, config }) {
    const navWidth = isSidebarClosed ? config.sidebarClosedWidth : config.sidebarWidth;

    const [isSearchFormVisible, setSearchFormVisible] = useState(false);
    const [theme, setTheme] = useState(false);

    const handleSearchClick = (e) => {
        e.preventDefault();
        setSearchFormVisible(!isSearchFormVisible);
    };

    const handleThemeChange = () => {
        setTheme(!theme);
        document.body.classList.toggle('dark', !theme);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 576 && isSearchFormVisible) {
                setSearchFormVisible(false);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [isSearchFormVisible]);

    return (
        <nav style={{ marginLeft: navWidth, width: `calc(100% - ${navWidth})` }}>
            <i className='bx bx-menu' onClick={toggleSidebar}></i>
            <form onSubmit={handleSearchClick}>
                <div className="form-input">
                    <input type="search" placeholder="Search..." />
                    <button className="search-btn" type="submit">
                        <i className={`bx ${isSearchFormVisible ? 'bx-x' : 'bx-search'}`}></i>
                    </button>
                </div>
            </form>

            <input
                type="checkbox"
                id="theme-toggle"
                checked={theme}
                onChange={handleThemeChange}
                hidden
            />
            <label htmlFor="theme-toggle" className="theme-toggle"></label>
            <a href="/" className="notif">
                <i className='bx bx-bell'></i>
                <span className="count">12</span>
            </a>
            <a href="/" className="profile">
                <img src="/images/logo.png" alt="Profile" />
            </a>
        </nav>
    );
}

export default TopNavbar;
