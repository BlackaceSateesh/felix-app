/* eslint-disable react/no-unescaped-entities */
import CustomPlanCard from "../../components/ui/CustomPlanCard";
import { AllPlansContent } from "../../constants/content/dummy/AllPlanContent";
import "../../styles/user/CustomPlanCard.css";
const OverallUserCustomPlan = () => {
  return (
    <>
      <div className="MatrimonyUserCustomPlan OverallUserCustomPlan">
        <div className="customPlan_heading">
          <h1 className="title">Choose Your Perfect Plan</h1>
          <p className="subTitle">
            Explore Our Custom Plans Tailored for Every Need
          </p>
        </div>
        <div className="offerCards">
          {AllPlansContent?.map((e, i) => (
            <CustomPlanCard key={i} data={e} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OverallUserCustomPlan;
