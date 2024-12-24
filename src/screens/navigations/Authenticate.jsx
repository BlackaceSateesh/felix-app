import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
import UserMain from "../website/UserMain";
import DashboardMain from "../DashboardMain";
import UserHome from "../user/UserHome";
import ProfilePage from "../user/ProfilePage";
import Reports from "../user/Reports";
import Withdrawal from "../user/Withdrawal";
import WithdrawalReport from "../user/WithdrawalReport";
import OverallUserCustomPlan from "../user/OverallUserCustomPlan";
const Authenticate = () => {
  return (
    <>
      <Routes>
        <Route path={AuthenticatedRoutes.USER_HOME} element={<UserMain />} />
        <Route path={"*"} element={<DashboardMain inner={<UserHome />} name="Dashboard" />} />
        <Route path={AuthenticatedRoutes.USER_DASHBOARD} element={<DashboardMain inner={<UserHome />} name="Dashboard" />} />
        <Route path={AuthenticatedRoutes.USER_PROFILE} element={<DashboardMain inner={<ProfilePage />} name="Profile" />} />
        <Route path={AuthenticatedRoutes.INVESTOR_REPORT} element={<DashboardMain inner={<Reports />} name="Investor Reports" />} />
        <Route path={AuthenticatedRoutes.WALLET} element={<DashboardMain inner={<Withdrawal />} name="Wallet" />} />
        <Route path={AuthenticatedRoutes.WITHDRAWAL_REPORT} element={<DashboardMain inner={<WithdrawalReport />} name="Withdrawal Report" />} />
        <Route path={AuthenticatedRoutes.OUR_PLANS} element={<DashboardMain inner={<OverallUserCustomPlan />} name="Our Plan" />} />
      </Routes>
    </>
  );
};

export default Authenticate;
