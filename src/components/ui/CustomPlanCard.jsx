/* eslint-disable react/prop-types */
import { HiCheck } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import { Button2 } from "./Buttons";

const CustomPlanCard = ({ data }) => {
  return (
    <>
      <div className="MatrimonyCustomOfferCard ss-card">
        {data?.popular ? (
          <div className="popularTag fill">Popular Plan</div>
        ) : (
          <div className="popularTag"> &nbsp;</div>
        )}

        <div className="center">
          <div className="planValues">
            <h6 className="planName">{(data?.planName)?.replace('_', ' ')}</h6>
            <h6 className="price">{data?.sellingPrice}$</h6>
            {/* <p className="duration">For {data?.duration}</p> */}
          </div>
          <span className="originprice">
            {/* <b>${data?.originalPrice}</b> Original Price */}
            <b>{data?.plateform}</b>
          </span>
          <Button2 name="Choose Plan" />
        </div>
        {/* <span className="featureHeading">All features options</span>
        <div className="featureList">
          {data?.descriptionEnumList?.map((e, i) => {
            return (
              <div key={i} className="list">
                <div className="circle active">
                <HiCheck />
                </div>
                {e}
              </div>
            );
          })}
          {data?.notIncludedBenefits?.map((e, i) => {
            return (
              <div key={i} className="list">
                <div className="circle">
                <RiCloseFill />
                </div>
                {e}
              </div>
            );
          })}
        </div> */}
      </div>
    </>
  );
};

export default CustomPlanCard;
