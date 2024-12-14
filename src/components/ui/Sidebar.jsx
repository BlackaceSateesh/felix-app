import React, { useState } from "react";
import "./Sidebar.css"; // Link to the corresponding CSS for the sidebar

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className={`l-navbar ${isSidebarOpen ? "show" : ""}`} id="navbar">
      <nav className="nav">
        <div>
          {/* Logo Section */}
          <a href="#" className="nav-logo">
            <img
              src="https://i.ibb.co/VDBpqPx/logo-1.png"
              alt="logo"
              className="nav-logo-icon"
            />
            <span className="nav-logo-text">Bedimcode</span>
          </a>

          {/* Toggle Button */}
          <div className="nav-toggle" id="nav-toggle" onClick={toggleSidebar}>
            <i className={`bx ${isSidebarOpen ? "bx-chevron-left" : "bx-chevron-right"}`}></i>
          </div>

          {/* Navigation Links */}
          <ul className="nav-list">
            {["home", "user", "notifications", "favorites", "bookmarks", "chat"].map((item) => (
              <li key={item} className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${activeLink === item ? "active" : ""}`}
                  onClick={() => handleLinkClick(item)}
                >
                  <i className={`bx bx-${item === "home" ? "grid-alt" : item} nav-icon`}></i>
                  <span className="nav-text">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout/Close Button */}
        <a href="#" className="nav-link">
          <i className="bx bx-log-out-circle nav-icon"></i>
          <span className="nav-text">Close</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
