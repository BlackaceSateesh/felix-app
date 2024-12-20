import { Link, useNavigate } from "react-router-dom";
import { Button2, ToggleButton } from "../ui/Buttons";
import TextInput from "../ui/TextInput";
import sideImg from "../../assets/auth/sideImg.png";
import authBg from "../../assets/auth/authBg.png";
import "../../styles/auth/AuthMain.css";
import { useState } from "react";
import { AuthenticatedRoutes } from "../../constants/Routes";

/* eslint-disable react/no-unescaped-entities */
const AuthMain = () => {
  const [mode, setMode] = useState(true);
   const navigate = useNavigate();
  
    const handleNavigate = () => {
      navigate(AuthenticatedRoutes.USER_DASHBOARD);
    };
  return (
    <>
      <div  data-aos="fade-right" className="AuthMain" style={{ backgroundImage: `url(${authBg})` }}>
        <div className="auth-inner">
          <div className="container-box">
            <div className="content">
              <h5 className="main-heading" data-aos="fade-up">
                Welcome Back <span className="hii">👋</span>
              </h5>
              <p data-aos="fade-up">
                Today is a new day. It's your day. You shape it. Sign in to
                start managing your projects.
              </p>
              <div data-aos="fade-up" className="mode-toggle">
                <p className={mode ? "active" : ""}>Login with Email</p> <p>OR</p>
                <ToggleButton onClick={() => setMode(!mode)} />
                <p className={mode ? "" : "active"}>Wallet login</p>
              </div>
              {mode ? (
                <div data-aos="fade-up" className="input-container">
                  <TextInput
                    placeholder={"Example@gmail.com"}
                    labelName="Email"
                  />
                  <TextInput
                    placeholder={"Enter Password"}
                    labelName="Password"
                  />
                </div>
              ) : (
                <div data-aos="fade-up" className="input-container">
                  <TextInput
                    placeholder={"Enter Your Wallet Address"}
                    labelName="Wallet Address"
                  />
                </div>
              )}

              <div data-aos="fade-up" className="btns">
                <Button2 onClick={handleNavigate} name={"Sign In"} />
              </div>

              <span data-aos="fade-up" className="accontTggle">
                Don't you have an account? <Link>Sign up</Link>
              </span>
            </div>
            <div data-aos="fade-left" className="side-img">
              <img src={sideImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthMain;
