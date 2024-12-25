/* eslint-disable react/no-unescaped-entities */
import { ProgressGraph } from "../../components/graphs/ProgressGraph";
import "../../styles/user/UserHome.css";
import SSDataTable from "../../components/SSDataTable";
import { Button2, Button5 } from "../../components/ui/Buttons";
import Achievement from "../../components/ui/Achievement";
import { useState } from "react";
import SwitchPromoter from "../../components/SwitchPromoter";
import cardImg from "../../assets/cardImg.png";
import { maskMemberId } from "../../utils/additionalFunc";
import { useNavigate } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
import { AllPlansContent } from "../../constants/content/dummy/AllPlanContent";
import CustomPlanCard from "../../components/ui/CustomPlanCard";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateFunctions";
const UserHome = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  const userData = {
    // sponsor_id: "SS123456",
    // subscription: "Premium",
    trading_package: "$" + userInfo?.investment?.toFixed(4) || "0",
    trading_profit: "$" + userInfo?.totalIncome?.toFixed(4) || "0",
    date_of_activation: formatDate(userInfo?.activeDate),
    renewal_status: userInfo?.isActive ? "Active" : "Inactive",
  };
  const memberData = [
    {
      memberId: "M12345",
      investment: 5000,
      dateOfActivation: "2024-01-15",
      status: "Active",
    },
    {
      memberId: "M12346",
      investment: 10000,
      dateOfActivation: "2024-02-01",
      status: "Inactive",
    },
    {
      memberId: "M12347",
      investment: 15000,
      dateOfActivation: "2024-03-10",
      status: "Active",
    },
    {
      memberId: "M12348",
      investment: 2000,
      dateOfActivation: "2024-05-20",
      status: "Active",
    },
  ];
  const [showPromotor, setShowPromotor] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  };

  const showPromoterHandler = () => {
    return !userInfo?.isActive && userInfo?.parmoterRequest === "Not Requested";
  };

  return (
    <>
      <div className="UserHome">
        <div className="top-btns">
          <div className="left">
            <Button2 name={"Invest"} onClick={() => handleNavigate(AuthenticatedRoutes.OUR_PLANS)} />
            <Button2
              onClick={() => handleNavigate(AuthenticatedRoutes.WALLET)}
              name={"Withdrawal"}
            />
            <Button2
              onClick={() => handleNavigate(AuthenticatedRoutes.OUR_PLANS)}
              name={"Our Plans"}
            />
          </div>
          <div className="ss-card linearBg">
            <h4 className="heading">
              <b>Total Amount:</b> ${userInfo?.totalIncome?.toFixed(4) || "0"}
            </h4>
          </div>
        </div>
        {/* <Achievement />
        <div className="member-detaisMain">
          <div className="ss-card">
            <div className="member-details">
              <div className="card1 martop">
                <div className="head">
                  <h5 className="cardHeading">Member Details</h5>
                </div>
                <div className="content">
                  <div className="detail-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Member Id</th>
                          <th>Date of Activation</th>
                          <th>Status</th>
                          <th>Investment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {memberData.map((item, index) => (
                          <tr key={index}>
                            <td>{maskMemberId(item.memberId)}</td>
                            <td>{item.dateOfActivation}</td>
                            <td>{item.status}</td>
                            <td>{item.investment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="all-buttons martop">
            <div className="left">
              <Button2 name={"Invest"} />
              <Button2
                onClick={() => handleNavigate(AuthenticatedRoutes.WALLET)}
                name={"Withdrawal"}
              />
            </div>
            <div className="ss-card linearBg">
              <h4 className="heading">
                <b>Total Amount:</b> $10,000
              </h4>
            </div>
          </div>
        </div> */}
        <SwitchPromoter
          show={showPromotor}
          onHide={() => setShowPromotor(false)}
        />
        <div className="top-wrapper martop" style={{ marginTop: showPromoterHandler() ? "" : "100px" }} >
          <div className="ss-card welcome-card">
            <div className="top">
              <h5 className="heading">
                Welcome {userInfo?.username || "User"}!
              </h5>
            </div>
            <p className="para1">We're happy to have you on board.</p>
            <div className="content">
              <div className="c-left">
                <span className="para1 bold">Ready to get started?</span>
                <p className="para1">Check out your dashboard to begin!</p>
                {showPromoterHandler() && (
                  <div className="btn-box">
                    <Button5
                      onClick={() => {
                        setShowPromotor(true);
                      }}
                      name={"Switch to Promotor"}
                    />
                  </div>
                )}
              </div>
              <div className="c-right">
                <img src={cardImg} alt="gift icon" className="gift-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="income-wrapper mar-top">
          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Income</h5>
              <p>${userInfo?.totalIncome?.toFixed(4) || "0"}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/3d-fluency/94/coin-wallet.png"}
                alt=""
              />
            </div>
          </div>
          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Investment</h5>
              <p>${userInfo?.investment?.toFixed(4) || "0"}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/3d-fluency/94/expensive-price.png"}
                alt=""
              />
            </div>
          </div>
          <div className="income-card ss-card">
            <div className="left">
              <h5>Current Income</h5>
              <p>${userInfo?.todayIncome?.toFixed(4) || "0"}</p>
            </div>
            <div className="right">
              <img
                src={
                  "https://img.icons8.com/3d-fluency/94/change-user-male.png"
                }
                alt=""
              />
            </div>
          </div>
        </div>
        {/* details */}
        <div className="detail-wrapper">
          <div className="left ss-card">
            <div className="head">
              <h5 className="cardHeading">About Me</h5>
              <div className="detail-table">
                <table>
                  <tbody>
                    {userData &&
                      Object.entries(userData)?.map(([key, value]) => (
                        <tr key={`detail-${key}`}>
                          <td>{key?.replaceAll("_", " ")}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="right ss-card">
            {/* <CircularProgressbarWithChildren
              value={percentage}
              styles={{ root: {}, path: { stroke: "#6D6CB8" } }}
              strokeWidth={8}
            >
              <span className="progress-text">
                {percentage}
                <tspan>%</tspan>
              </span>
            </CircularProgressbarWithChildren> */}
            <ProgressGraph />
            <h6 className="text-val">Your Progress</h6>
          </div>
        </div>
        {/* <div className="ss-card  mar-top">
          <div className="head">
            <h5 className="cardHeading">Progress History</h5>
          </div>
          <SSDataTable />
        </div> */}
        <div className="MatrimonyUserCustomPlan dash-card OverallUserCustomPlan">
          <div className="ss-card mar-top">
            <div className="head">
              <h5 className="cardHeading">Our Plans</h5>
            </div>
            <div className="offerCards">
              {AllPlansContent?.map((e, i) => (
                <CustomPlanCard key={i} data={e} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
