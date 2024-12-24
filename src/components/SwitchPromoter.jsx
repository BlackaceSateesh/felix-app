/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import TextInput from "./ui/TextInput";
import { Button5 } from "./ui/Buttons";
import TextareaField from "./ui/TextareaField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { requestPromoter } from "../api/user-api";
import Swal from "sweetalert2"; // Assuming Swal is imported for the alert functionality
import PageLoader from "./ui/PageLoader";

const SwitchPromoter = (props) => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  const [payload, setPayload] = useState({
    remark: "",
    clientId: userInfo?._id,
  });
  useEffect(() => {
    setPayload({ ...payload, clientId: userInfo?._id });
  }, [userInfo]);

  const [loading, setLoading] = useState(false); // Adding the loading state

  const validate = () => {
    // You can add your form validation logic here
    if (!payload.remark) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Remark are required.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (loading) return;
    setLoading(true);
    try {
      const response = await requestPromoter(payload);

      Swal.fire({
        icon: "success",
        title: "Switch Success",
        text:
          response?.message || "Promoter Switched Request sent successfully.",
      });
      setInterval(() => {
        props.onHide();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error during switch:", error);
      Swal.fire({
        icon: "error",
        title: "Switch Failed",
        text: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="SwitchPromoter-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Switch Promoter
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-container">
            <TextInput
              disabled
              value={userInfo?.username}
              labelName={"Promoter Name"}
              placeholder={"Promoter Name"}
            />
            <TextInput
              disabled
              value={userInfo?.email}
              labelName={"Email"}
              placeholder={"Email"}
            />
            <TextareaField
              onChange={(e) =>
                setPayload({ ...payload, remark: e.target.value })
              }
              value={payload.remark}
              labelName={"Remark"}
              placeholder={"Enter remark here..."}
              error={""}
            />
          </div>
          <div className="btns">
            <Button5
              name={"Switch Promoter"}
              onClick={handleSubmit}
              disabled={loading}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SwitchPromoter;
