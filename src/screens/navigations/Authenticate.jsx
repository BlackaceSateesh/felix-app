import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
import UserMain from "../website/UserMain";
const Authenticate = () => {
  return (
    <>
      <Routes>
        <Route path={AuthenticatedRoutes.User_HOME} element={<UserMain />} />
        <Route path="*" element={<UserMain />} />
      </Routes>
    </>
  );
};

export default Authenticate;
