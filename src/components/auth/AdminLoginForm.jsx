/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { Button2 } from "../ui/Buttons";
import TextInput from "../ui/TextInput";
import { useState } from "react";
import { AuthenticatedRoutes } from "../../constants/Routes";
import { loginWithEmailAdmin } from "../../api/auth-api";
import PageLoader from "../ui/PageLoader";
import { emailValidator, passwordValidator } from "../../utils/inputValidator";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";

const AdminLoginForm = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(AuthenticatedRoutes.ADMIN_DASHBOARD);
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
      const response = await loginWithEmailAdmin({
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
        text: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="AdminMain">
        <div className="AdminLoginForm content">
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

          <div data-aos="fade-up" className="btns">
            <Button2
              onClick={handleSubmit}
              name={"Sign In"}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginForm;
