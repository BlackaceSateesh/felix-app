import { Button1 } from "../../components/ui/Buttons";
import { UserWebsiteContent } from "../../constants/content/UserWebsiteContent";
import heroBg from "../../assets/website/heroBg.png";
import cardImg1 from "../../assets/website/cardImg1.png";
import cardImg2 from "../../assets/website/cardImg2.png";
import cardImg3 from "../../assets/website/cardImg3.png";
import about1 from "../../assets/website/3dImg4.png";
import about2 from "../../assets/website/3dImg3.png";
import { Heading1, SubHeading1 } from "../../components/ui/Headings";
import CoinSpinner from "../../components/ui/CoinSpinner";

const UserHome = () => {
  return (
    <>
      <div className="UserHome" id="home">
        {/* ======= hero section start ======= */}
        <div className="hero-section">
          <div className="inner">
            <div className="left">
              <h1 data-aos="fade-right" className="title">
                {UserWebsiteContent?.heroSection?.title}
              </h1>
              <p data-aos="fade-right" className="para">
                {UserWebsiteContent?.heroSection?.desc}
              </p>
              <Button1
                dataAos={"fade-right"}
                name="Login"
                className={"login"}
              />
            </div>
            <div className="right">
              <div className="bg-img">
                <img src={heroBg} alt="" />
              </div>
            </div>
          </div>
          <div data-aos="fade-up" className="inner">
            <div className="cards-img-wrapper">
              <div className="cardImg">
                <img src={cardImg1} alt="" />
              </div>
              <div className="cardImg">
                <img src={cardImg2} alt="" />
              </div>
              <div className="cardImg">
                <img src={cardImg3} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* ======= hero section end ======= */}
        {/* ======= about section start ======= */}
        <div className="about-section" id="about">
          <div className="section-inner">
            <div className="left">
              <div data-aos="fade-down" className="img-box">
                <img className="img-drop-shadow " src={about1} alt="" />
              </div>
            </div>
            <div className="right">
              <div className="content">
                <SubHeading1
                  name={UserWebsiteContent?.aboutSection?.subTitle}
                />
                <Heading1 name={UserWebsiteContent?.aboutSection?.title} />
                <p className="para" data-aos="fade-up">
                  {UserWebsiteContent?.aboutSection?.desc}
                </p>
              </div>
              <div data-aos="fade-up" className="img-box">
                <img className="img-drop-shadow " src={about2} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* ======= about section end ======= */}
        {/* ======= services section start ======= */}
        <div className="service-section" id="services">
          <div className="section-inner">
            <Heading1 name={UserWebsiteContent?.servicesSection?.title} />
            <p className="para top" data-aos="fade-up">
              {UserWebsiteContent?.servicesSection?.desc}
            </p>

            <div className="card-box-wrapper">
              {UserWebsiteContent?.servicesSection?.lists?.map((item,i) => (
                <div key={`service-${i}`} className="card" data-aos="fade-up">
                  <div className="img-box">
                    <img className="img-drop-shadow " src={item?.icon} alt="" />
                  </div>
                  <div className="content">
                    <h3>{item?.name}</h3>
                    <p className="para">{item?.para}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ======= services section end ======= */}
        <CoinSpinner />
        <div className="best-product-section">
          <div className="section-inner">
            <Heading1 name={UserWebsiteContent?.bestProductSection?.title} />
            <div className="card-lists">
              {UserWebsiteContent?.bestProductSection?.lists?.map((item,i) => (
                <div key={`product-${i}`} className="card" data-aos="fade-up">
                  <div className="top">
                    <div className="img-box">
                      <img
                        className="img-drop-shadow "
                        src={item?.icon}
                        alt=""
                      />
                    </div>
                    <h3>{item?.name}</h3>
                  </div>
                  <div className="content">
                    <p className="para">{item?.para}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ======= price card section start ======= */}
        <div className="price-card-section" id="plans">
          <div className="section-inner">
            <Heading1 name={UserWebsiteContent?.priceCardSection?.title} />
            <p className="para top" data-aos="fade-up">
              {UserWebsiteContent?.priceCardSection?.desc}
            </p>
            <div className="card-lists">
              {UserWebsiteContent?.priceCardSection?.lists?.map((item,i) => (
                <div key={`price-${i}`} className="card" data-aos="fade-up">
                  {
                    item?.discount && (
                      <div className="tag">{item?.discount}</div>
                    )
                  }
                  <h5>{item?.price}</h5>
                  <h6>{item?.name}</h6>
                  <button>Subscribe</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ======= price card section end ======= */}
        {/* ======= footer section start ======= */}
        
        {/* ======= footer section end ======= */}

      </div>
    </>
  );
};

export default UserHome;
