import { useSelector } from "react-redux";
import { Button5 } from "../../components/ui/Buttons";
import TextInput from "../../components/ui/TextInput";
import "../../styles/ProfilePage.css";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateFunctions";
const ProfilePage = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [payload, setPayload] = useState({
    name: "",
    mobile: "",
    email: "",
    joiningDate: "",
    status: "",
    activeDate: "",
  });

  useEffect(() => {
    setPayload({
      name: userInfo?.username,
      mobile: userInfo?.mobile,
      email: userInfo?.email,
      joiningDate: formatDate(userInfo?.createdAt),
      status: userInfo?.isActive ? "Active" : "Inactive",
      activeDate: formatDate(userInfo?.activeDate),
    });
  }, [userInfo]);

  return (
    <>
      <div className="ProfilePage martop">
        <div className="inner ss-card">
          {/* <div className="profileImg">
            <img src="" alt="" />
          </div> */}
          <div className="input-container">
            <TextInput
              placeholder={"Name"}
              value={payload?.name}
              labelName="Name"
            />
            <TextInput
              placeholder={"Mobile"}
              value={payload?.mobile}
              labelName="Mobile"
              min={10}
              max={10}
            />
            <TextInput
              placeholder={"Email"}
              value={payload?.email}
              labelName="Email"
            />
            <TextInput
              disabled={"disabled"}
              placeholder={"Joining Date"}
              value={payload?.joiningDate}
              labelName="Joining Date"
            />
            <TextInput
              disabled={"disabled"}
              placeholder={"Status"}
              value={payload?.status}
              labelName="Status"
            />
            <TextInput
              disabled={"disabled"}
              placeholder={"Active Date"}
              value={payload?.activeDate}
              labelName="Active Date"
            />
            {/* <TextInput disabled={"disabled"} placeholder={"Global Crowd Share Status"} labelName="Global Crowd Share Status" /> */}
          </div>
          <div className="btns">
            <Button5 name={"Edit"} />
          </div>
        </div>
    
      </div>
    </>
  );
};

export default ProfilePage;
