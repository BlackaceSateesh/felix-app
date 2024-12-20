import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../constants/Routes";
import AuthMain from "../../components/auth/AuthMain";
const Auth = () => {
  return (
    <>
      <Routes>
        <Route path={AuthRoutes.LOGIN} element={<AuthMain />} />
      </Routes>
    </>
  );
};

export default Auth;
