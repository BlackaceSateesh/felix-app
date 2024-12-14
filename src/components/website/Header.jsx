import { MainContent } from "../../constants/content/MainContent";
import { Button1 } from "../ui/Buttons";

const Header = () => {
  const headerData = [
    {
      id: "home",
      name: "Home",
    },
    {
      id: "about",
      name: "About",
    },
    {
      id: "services",
      name: "Services",
    },
    {
      id: "plans",
      name: "Plans",
    },
    {
      id: "contact",
      name: "Contact",
    },
  ];
  return (
    <>
      <div className="Header">
        <div className="Header-inner section-inner">
          <div data-aos="fade-right" className="logo box-wrapper">
            <img src={MainContent?.appLogo} alt="" />
          </div>
          <div data-aos="fade-down" className="links-box box-wrapper">
            {headerData.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="link">
                {item.name}
              </a>
            ))}
          </div>
          <Button1 dataAos={"fade-right"} className="login" name="Login" />
        </div>
      </div>
    </>
  );
};

export default Header;
