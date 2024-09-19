import React, { useState } from 'react';
import '../css/Sidebar.css';
import 'boxicons/css/boxicons.min.css';

function Sidebar({ setContent, isSidebarClosed, onSidebarToggle, config }) {
    const [activeItem, setActiveItem] = useState("Dashboard");

    const menuItems = [
        { name: "Dashboard", icon: "bxs-dashboard" },
        { name: "Subjects", icon: "bxs-school" },
        { name: "Assessments", icon: "bx-analyse" },
        { name: "Learner Progress", icon: "bx-run" },
        { name: "Class Progress", icon: "bx-stats" },
        { name: "Learner List", icon: "bx-list-ol" }, 
        { name: "Groups", icon: "bx-group" },
        { name: "Notifications", icon: "bxs-bell-ring" },
        { name: "Settings", icon: "bx-cog" }
    ];

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
        setContent(itemName);
    };

    return (
        <div className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
            <div>
            <a href="/" className="logo">
                <i className='bx bxs-book-reader'></i>
                <div className="logo-name"><span>Tea</span>cher</div>
            </a>
            </div>


            <ul className="side-menu">
                {menuItems.map((item, index) => (
                    <li key={index} className={activeItem === item.name ? 'active' : ''}>
                        <a href="/" onClick={(e) => { e.preventDefault(); handleItemClick(item.name); }}>
                            <i className={`bx ${item.icon}`}></i>{item.name}
                        </a>
                    </li>
                ))}
            </ul>
            <ul className="side-menu">
                <li>
                    <a href="/" className="logout">
                        <i className='bx bx-log-out-circle'></i>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
