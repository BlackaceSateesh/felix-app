/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import BNBPayment from "../wallet/BNBPayment";

const PaymentModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="payment-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            BNB Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="payment-modal">
            <div className="modal-content">
              <BNBPayment
                amount={props?.amount}
                onSuccess={props?.onSuccess}
                onFailure={props?.onFailure}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PaymentModal;
