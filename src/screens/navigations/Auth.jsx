import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../constants/Routes";
import AuthMain from "../../components/auth/AuthMain";
import AuthRegisterForm from "../../components/auth/AuthRegisterForm";
import AuthLoginForm from "../../components/auth/AuthLoginForm";
const Auth = () => {
  return (
    <>
      <Routes>
        <Route
          path={AuthRoutes.LOGIN}
          element={<AuthMain inner={<AuthLoginForm />} />}
        />
        <Route
          path={AuthRoutes.REGISTER}
          element={<AuthMain inner={<AuthRegisterForm />} />}
        />
        <Route path="*" element={<AuthMain inner={<AuthLoginForm />} />} />
      </Routes>
    </>
  );
};

export default Auth;
