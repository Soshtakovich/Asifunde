import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Optional if used elsewhere
import '../CSS/Sidebar.css';

function Sidebar({ setContent, isSidebarClosed }) {
    const [activeItem, setActiveItem] = useState("Dashboard");

    const menuItems = [
        { name: "Dashboard", icon: "bxs-dashboard" },
        { name: "Content", icon: "bxs-school" },
        { name: "Assessments", icon: "bx-analyse" },
        { name: "Submissions", icon: "bx bxl-graphql" },
        { name: "Class List", icon: "bx bx-list-ol" },
        { name: "Announcements", icon: "bxs-bell-ring" },
    ];

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
        setContent(itemName); // Pass the selected item name to the parent
    };

    const handleLogout = (e) => {
        e.preventDefault(); // Prevent page reload
        sessionStorage.clear(); // Clear session storage
        window.location.href = "https://zakesmatsimbe.net.za/Asifunde-App/Asifunde-logout.html"; // Redirect to logout page
    };

    return (
        <div className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
            <a href="/" className="logo">
                <i className='bx bxs-log-in-circle'></i>
                <div className="logo-name"><span>Asi</span>Funde</div>
            </a>
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
                    <a href="/" className="logout" onClick={handleLogout}>
                        <i className='bx bxs-log-out-circle'></i>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
