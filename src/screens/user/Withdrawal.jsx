import { useState } from "react";
import { Button5 } from "../../components/ui/Buttons";
import SelectInput from "../../components/ui/SelectInput";
import TextInput from "../../components/ui/TextInput";
import { useSelector } from "react-redux";

const Withdrawal = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  const wallet = ["BTC", "ETH"]
  return (
    <>
      <div className="Withdrawal">
        <div className="ss-card half martop">
          <div className="top">
            <h5 className="heading">Main Wallet : $ {userInfo?.totalIncome || "0"}</h5>
          </div>
          <div className="input-container">
            <TextInput placeholder={"Enter Amount"} labelName="Amount" />
            <SelectInput
              options={wallet}
              // onChange={(e) => setSelectWallet(e.target.value)}
              labelName="Choose Wallet"
            />
            {/* <TextInput placeholder={`Enter ${selectWallet} Wallet Address`} labelName={`${selectWallet} Wallet Address`} /> */}
          </div>
          <div className="btns">
            <Button5 name={"Withdraw"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
