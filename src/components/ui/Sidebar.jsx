import { useEffect, useState } from "react";
import "../../styles/Sidebar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SidebarContent } from "../../constants/content/SidebarContent";
import { MainContent } from "../../constants/content/MainContent";
import { Link } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState(
    SidebarContent?.userAdmin?.[0]?.id
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    } 
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } 
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`Sidebar ss-card ${isSidebarOpen ? "show" : "hide"}`}
      id="navbar"
    >
      <nav className="nav">
        <div>
          <Link to={AuthenticatedRoutes.USER_DASHBOARD} className="nav-logo">
            <img
              src={MainContent.appLogoClr}
              alt="logo"
              className="nav-logo-icon"
            />
          </Link>

          <div className="nav-toggle" id="nav-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </div>

          <ul className="nav-list">
            {SidebarContent?.userAdmin?.map((item) => (
              <li key={item?.id} className="nav-item">
                <Link
                  to={item?.link}
                  className={`nav-link ${activeLink === item?.id ? "active" : ""}`}
                  onClick={() => handleLinkClick(item?.id)}
                >
                  {item?.icon}
                  <span className="nav-text">
                    {item?.name.charAt(0)?.toUpperCase() + item?.name.slice(1)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
