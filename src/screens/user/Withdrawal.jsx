import { useState } from "react";
import { Button5 } from "../../components/ui/Buttons";
import SelectInput from "../../components/ui/SelectInput";
import TextInput from "../../components/ui/TextInput";

const Withdrawal = () => {
  const wallet = ["BTC", "ETH"]
  const [selectWallet, setSelectWallet] = useState(wallet[0]);
  return (
    <>
      <div className="Withdrawal">
        <div className="ss-card half martop">
          <div className="top">
            <h5 className="heading">Main Wallet : $ 0</h5>
          </div>
          <div className="input-container">
            <TextInput placeholder={"Enter Amount"} labelName="Amount" />
            <SelectInput
              options={wallet}
              onChange={(e) => setSelectWallet(e.target.value)}
              labelName="Choose Wallet"
            />
            <TextInput placeholder={`Enter ${selectWallet} Wallet Address`} labelName={`${selectWallet} Wallet Address`} />
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
