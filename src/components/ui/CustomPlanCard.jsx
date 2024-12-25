/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button2 } from "./Buttons";
import BNBPayment from "../wallet/BNBPayment";

const CustomPlanCard = ({ data }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleInvestClick = () => {
    setShowPaymentModal(true);
  };
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
            <h6 className="planName">{data?.planName?.replace("_", " ")}</h6>
            <h6 className="price">{data?.sellingPrice}$</h6>
          </div>
          <span className="originprice">
            <b>{data?.plateform}</b>
          </span>
          <Button2 onClick={handleInvestClick} name="Invest" />
        </div>
      </div>

      {showPaymentModal && (
        <div className="payment-modal">
          <div className="modal-content">
            <h4>Bullioncoin</h4>
            <BNBPayment
              amount={data?.sellingPrice} 
              onSuccess={() => setShowPaymentModal(false)}
              onFailure={() => setShowPaymentModal(false)}
            />
            <button
              onClick={() => setShowPaymentModal(false)}
              className="close-modal"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </>
  );
};

export default CustomPlanCard;
