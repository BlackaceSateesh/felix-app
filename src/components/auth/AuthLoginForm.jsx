/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { Button2, ToggleButton } from "../ui/Buttons";
import TextInput from "../ui/TextInput";
import { useState } from "react";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import { loginWithEmailApi } from "../../api/auth-api";
import PageLoader from "../ui/PageLoader";
import { emailValidator, passwordValidator } from "../../utils/inputValidator";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { loginWithWallet } from "../../api/wallet-api";

const AuthLoginForm = () => {
  const [mode, setMode] = useState(true);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(AuthenticatedRoutes.USER_DASHBOARD);
    window.location.reload();
  };

  const validate = () => {
    let formErrors = {};
    let isValid = true;

    const emailError = emailValidator(payload.email);
    if (emailError) {
      formErrors.email = emailError;
      isValid = false;
    }

    const passwordError = passwordValidator(payload.password);
    if (passwordError) {
      formErrors.password = passwordError;
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (loading) return;
    setLoading(true);

    try {
      const response = await loginWithEmailApi({
        email: payload.email,
        password: payload.password,
      });

      SwalSuccess.fire({
        icon: "success",
        title: "Login Success",
        text: "You have logged in successfully",
      });
      localStorage.setItem("token", response.token);
      setTimeout(() => {
        handleNavigate();
      }, 2000);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (typeof window.ethereum !== "undefined") {
      // eslint-disable-next-line no-undef
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];

        const message = "Please sign this message to log in to the application";
        const signature = await web3.eth.personal.sign(message, account);
        console.log(account, signature);

        const { data } = await loginWithWallet({ account, signature });
        console.log(data);
        if (data.success) {
          SwalSuccess.fire({
            icon: "success",
            title: "Login Success",
            text: "You have logged in successfully",
          });
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            handleNavigate();
          }, 2000);
        } else {
          SwalError.fire({
            icon: "error",
            title: "Login Failed",
            text: "Authentication failed",
          });
        }
      } catch (error) {
        console.error(error);
        SwalError.fire({
          icon: "error",
          title: "MetaMask Error",
          text: error?.response?.data?.message,
        });
      }
    } else {
      SwalError.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please install MetaMask!",
      });
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="AuthLoginForm content">
        <h5 className="main-heading" data-aos="fade-up">
          Welcome Back <span className="hii">👋</span>
        </h5>
        <p data-aos="fade-up">
          Today is a new day. It's your day. You shape it. Sign in to start
          managing your projects.
        </p>
        <div data-aos="fade-up" className="mode-toggle">
          <p className={mode ? "active" : ""}>Login with Email</p> <p>OR</p>
          <ToggleButton onClick={() => setMode(!mode)} />
          <p className={mode ? "" : "active"}>Wallet login</p>
        </div>

        {mode ? (
          <div data-aos="fade-up" className="input-container">
            <TextInput
              onChange={(e) =>
                setPayload({ ...payload, email: e.target.value })
              }
              value={payload?.email}
              placeholder={"Example@gmail.com"}
              labelName="Email"
              error={errors.email}
            />
            <TextInput
              type={"password"}
              value={payload?.password}
              onChange={(e) =>
                setPayload({ ...payload, password: e.target.value })
              }
              placeholder={"Enter Password"}
              labelName="Password"
              error={errors.password}
            />
          </div>
        ) : (
          ""
        )}

        <div data-aos="fade-up" className="btns">
          {mode ? (
            <Button2
              onClick={handleSubmit}
              name={"Sign In"}
              disabled={loading}
            />
          ) : (
            <Button2 onClick={handleLogin} name={"Connect Wallet"} />
          )}
        </div>

        <span data-aos="fade-up" className="accontTggle">
          Don't you have an account?{" "}
          <Link to={AuthRoutes.REGISTER}>Sign up</Link>
        </span>
      </div>
    </>
  );
};

export default AuthLoginForm;
