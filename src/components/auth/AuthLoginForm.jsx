/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { Button2, ToggleButton } from "../ui/Buttons";
import TextInput from "../ui/TextInput";
import { useState, useEffect } from "react";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import PageLoader from "../ui/PageLoader";
import { emailValidator, passwordValidator } from "../../utils/inputValidator";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { ethers } from "ethers";

const AuthLoginForm = () => {
  const [mode, setMode] = useState(true);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentAccount, setCurrentAccount] = useState(null);

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

  const handleWalletLogin = async () => {
    if (!window.ethereum) {
      SwalError.fire({
        icon: "error",
        title: "No Wallet Found",
        text: "Please install a wallet like MetaMask to continue.",
      });
      return;
    }

    const { ethereum } = window;
    try {
      // Request user's accounts
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setCurrentAccount(account);

      // Set up the provider and signer
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = provider.getSigner();  // Get signer from provider

      // Sign a message for wallet authentication
      const message = `Login to my app with your wallet address: ${account}`;
      const signature = await signer.signMessage(message); // Sign message using signer

      console.log("Signed message:", signature);

      // You can send the signed message to your backend for verification here

      SwalSuccess.fire({
        icon: "success",
        title: "Wallet Login Success",
        text: "You have successfully logged in with your wallet!",
      });

      // Store the wallet address in localStorage for session management
      localStorage.setItem("walletAddress", account);
      setTimeout(() => {
        handleNavigate();
      }, 2000);

    } catch (error) {
      console.error("Error during wallet login:", error);
      SwalError.fire({
        icon: "error",
        title: "Wallet Login Failed",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const { ethereum } = window;
      ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        } else {
          setCurrentAccount(null);
        }
      });
    }
  }, []);

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
            <Button2 onClick={handleWalletLogin} name={"Connect Wallet"} />
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
