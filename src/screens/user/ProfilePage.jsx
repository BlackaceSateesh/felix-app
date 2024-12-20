import { Button5 } from "../../components/ui/Buttons";
import TextInput from "../../components/ui/TextInput";
import "../../styles/ProfilePage.css";
const ProfilePage = () => {
  return (
    <>
      <div className="ProfilePage martop">
        <div className="inner ss-card">
          {/* <div className="profileImg">
            <img src="" alt="" />
          </div> */}
          <div className="input-container">
            <TextInput placeholder={"Name"} labelName="Name" />
            <TextInput placeholder={"Mobile"} labelName="Mobile" />
            <TextInput placeholder={"Email"} labelName="Email" />
            <TextInput placeholder={"Joining Date"} labelName="Joining Date" />
            <TextInput placeholder={"Status"} labelName="Status" />
            <TextInput placeholder={"Active Date"} labelName="Active Date" />
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
