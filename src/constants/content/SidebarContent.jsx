import { FaUserTie } from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuPackageSearch } from "react-icons/lu";
import { PiHandWithdrawBold } from "react-icons/pi";
import { AuthenticatedRoutes } from "../Routes";
import { FaWallet } from "react-icons/fa6";
import { MdOutlineAddCard } from "react-icons/md";

export const SidebarContent = (userRole) => {
  return userRole === "USER"
    ? {
        userAdmin: [
          {
            id: "Dashboard",
            icon: <HiOutlineSquares2X2 />,
            name: "Dashboard",
            link: AuthenticatedRoutes.USER_DASHBOARD,
          },
          {
            id: "Profile",
            icon: <FaUserTie />,
            name: "Profile",
            link: AuthenticatedRoutes.USER_PROFILE,
          },

          {
            id: "Wallet",
            icon: <FaWallet />,
            name: "Wallet",
            link: AuthenticatedRoutes.WALLET,
          },
          {
            id: "Withdrawal_Report",
            icon: <PiHandWithdrawBold />,
            name: "Withdrawal Report",
            link: AuthenticatedRoutes.WITHDRAWAL_REPORT,
          },
          {
            id: "Investor_Report",
            icon: <LuPackageSearch />,
            name: "Investment Report",
            link: AuthenticatedRoutes.INVESTOR_REPORT,
          },
          // FindAdmin(roleEnum.PROMOTER)
          // ? {
          //     id: "Promotor_Report",
          //     icon: <HiOutlineSquares2X2 />,
          //     name: "Promotor Report",
          //     link: AuthenticatedRoutes.PROMOTER_REPORT,
          //   }
          // : null,
          {
            id: "OurPlan",
            icon: <MdOutlineAddCard />,
            name: "Our Plan",
            link: AuthenticatedRoutes.OUR_PLANS,
          },
          // {
          //   id: "Commission Report",
          //   icon: <FaPercent />,
          //   name: "Commission Report",
          // },
          // {
          //   id: "Reward_Income_Report",
          //   icon: <FiGift />,
          //   name: "Reward Income Report",
          // },
          // {
          //   id: "Trade",
          //   icon: <BsCurrencyDollar />,
          //   name: "Trade",
          // },
          // {
          //   id: "Compound_Profit_Report",
          //   icon: <BsCurrencyDollar />,
          //   name: "Compound Profit Report",
          // },
          // {
          //   id: "Trading_Commission_Report",
          //   icon: <BsCurrencyDollar />,
          //   name: "Trading Commission Report",
          // },
          // {
          //   id: "Trading_Profit_Report",
          //   icon: <BsCurrencyDollar />,
          //   name: "Trading Profit Report",
          // },
          // {
          //   id: "Club_Income_Report",
          //   icon: <BsCurrencyDollar />,
          //   name: "Club Income Report",
          // },
          // {
          //   id: "My_Team",
          //   icon: <FaUsers />,
          //   name: "My Team",
          // },
        ],
      }
    : userRole === "PROMOTER"
    ? {
        userAdmin: [
          {
            id: "Dashboard",
            icon: <HiOutlineSquares2X2 />,
            name: "Dashboard",
            link: AuthenticatedRoutes.USER_DASHBOARD,
          },
          {
            id: "Profile",
            icon: <FaUserTie />,
            name: "Profile",
            link: AuthenticatedRoutes.USER_PROFILE,
          },

          {
            id: "Wallet",
            icon: <FaWallet />,
            name: "Wallet",
            link: AuthenticatedRoutes.WALLET,
          },
          {
            id: "Withdrawal_Report",
            icon: <PiHandWithdrawBold />,
            name: "Withdrawal Report",
            link: AuthenticatedRoutes.WITHDRAWAL_REPORT,
          },
          {
            id: "Investor_Report",
            icon: <LuPackageSearch />,
            name: "Investment Report",
            link: AuthenticatedRoutes.INVESTOR_REPORT,
          },
          {
            id: "Promotor_Report",
            icon: <LuPackageSearch />,
            name: "Promotor Report",
            link: AuthenticatedRoutes.PROMOTER_REPORT,
          },
          {
            id: "OurPlan",
            icon: <MdOutlineAddCard />,
            name: "Our Plan",
            link: AuthenticatedRoutes.OUR_PLANS,
          },
        ],
      }
    : {
        userAdmin: [
          {
            id: "Dashboard",
            icon: <HiOutlineSquares2X2 />,
            name: "Dashboard",
            link: AuthenticatedRoutes.ADMIN_DASHBOARD,
          },
          {
            id: "ApprovedPromoter",
            icon: <FaUserTie />,
            name: "Approved Promoter",
            link: AuthenticatedRoutes.APROVED_PROMOTER,
          },
        ],
      };
};
