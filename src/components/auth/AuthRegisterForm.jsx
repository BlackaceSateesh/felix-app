import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button2 } from "../ui/Buttons";
import TextInput from "../ui/TextInput";
import { AuthRoutes } from "../../constants/Routes";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from "../../utils/inputValidator";
import { registerWithEmailApi } from "../../api/auth-api";
import { SwalSuccess, SwalError } from "../../utils/custom-alert";
import PageLoader from "../ui/PageLoader";

/* eslint-disable react/no-unescaped-entities */
const AuthRegisterForm = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleNavigate = () => {
    navigate(AuthRoutes.LOGIN);
  };

  const validate = () => {
    const validationErrors = {};
    let isValid = true;

    const nameError = nameValidator(formData.name);
    const emailError = emailValidator(formData.email);
    const passwordError = passwordValidator(formData.password);
    const confirmPasswordError =
      formData.password !== formData.confirmPassword
        ? "Passwords do not match"
        : "";
    const mobileError = phoneValidator(formData.mobile, false);

    if (nameError) {
      validationErrors.name = nameError;
      isValid = false;
    }
    if (emailError) {
      validationErrors.email = emailError;
      isValid = false;
    }
    if (passwordError) {
      validationErrors.password = passwordError;
      isValid = false;
    }
    if (confirmPasswordError) {
      validationErrors.confirmPassword = confirmPasswordError;
      isValid = false;
    }
    if (mobileError) {
      validationErrors.mobile = mobileError;
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleRegisterClick = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await registerWithEmailApi(
        formData,
        search?.split("=")[1] || ""
      );
      SwalSuccess.fire({
        icon: "success",
        title: "Registration Successful",
        text: response?.message,
      });

      localStorage.setItem("token", response.token);
      setTimeout(() => {
        handleNavigate();
      }, 3000);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}

      <div className="AuthRegisterForm content">
        <h5 className="main-heading" data-aos="fade-up">
          Register <span className="hii">🙏🏻</span>
        </h5>
        <p data-aos="fade-up">
          Today is a new day. It's your day. You shape it. Sign up to start
          managing your projects.
        </p>

        <div data-aos="fade-up" className="input-form">
          <div className="input-container">
            <TextInput
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}
              placeholder="John Doe"
              labelName="Name"
              error={errors.name}
            />
            <TextInput
              value={formData.email}
              onChange={(e) => handleChange(e, "email")}
              placeholder="example@gmail.com"
              labelName="Email Address"
              error={errors.email}
            />
            <TextInput
              value={formData.mobile}
              onChange={(e) => handleChange(e, "mobile")}
              placeholder="Enter Mobile Number"
              labelName="Mobile Number"
              error={errors.mobile}
              min={10}
              max={10}
            />
            <TextInput
              type="password"
              value={formData.password}
              onChange={(e) => handleChange(e, "password")}
              placeholder="Enter Password"
              labelName="Password"
              error={errors.password}
            />
            <TextInput
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange(e, "confirmPassword")}
              placeholder="Confirm Password"
              labelName="Confirm Password"
              error={errors.confirmPassword}
            />
          </div>

          <div className="btns">
            <Button2
              name={"Sign Up"}
              onClick={handleRegisterClick}
              disabled={loading}
            />
          </div>
        </div>

        <span className="accontTggle">
          Already have an account? <Link to={AuthRoutes.LOGIN}>Sign In</Link>
        </span>
      </div>
    </>
  );
};

export default AuthRegisterForm;
