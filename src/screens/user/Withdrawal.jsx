import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { Button5 } from "../../components/ui/Buttons";
import SelectInput from "../../components/ui/SelectInput";
import TextInput from "../../components/ui/TextInput";
import PageLoader from "../../components/ui/PageLoader";
import {
  checkWithdrawEligibility,
  setWithdrawalTransaction,
} from "../../api/wallet-api";
import { SwalError } from "../../utils/custom-alert";
import { convertUSDToBNB } from "../../utils/additionalFunc";

const Withdrawal = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [BNBAmount, setBNBAmount] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [eligibility, setEligibility] = useState(false);

    const convertAndLog = async (amount) => {
      try {
        const bnbAmount = await convertUSDToBNB(amount); // Wait for the result
        setBNBAmount(bnbAmount?.toFixed(5));
        console.log(bnbAmount); // Log the actual BNB amount
        // console.log(`$${amount} USD is equal to ${bnbAmount} BNB.`);
      } catch (error) {
        console.error("Error during conversion:", error);
      }
    };
  
    // Call the async function
    useEffect(() => {
      if (!amount) return;
      convertAndLog(amount);
    }, [amount]);

  const wallet = ["BNB"];

  const withdrawalAddress = import.meta.env.VITE_WITHDRAWAL_ADDRESS;
  const withdrawalPrivateKey = import.meta.env.VITE_PRIVATE_KEY;

  const checkMetaMask = () => {
    if (window.ethereum) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "MetaMask not found",
        text: "Please install MetaMask to continue.",
      });
      return false;
    }
  };

  const handleConnectWallet = async () => {
    if (!checkMetaMask()) return;

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const userAddress = await signer.getAddress();
      console.log("Connected wallet address:", userAddress);
      setWalletAddress(userAddress);
      setWalletConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: "Failed to connect wallet. Please try again.",
      });
    }
  };

  const handleWithdraw = async () => {
    setLoading(true);

    if (!amount || parseFloat(amount) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Please enter a valid withdrawal amount.",
      });
      setLoading(false);
      
      return;
    }
    if (amount > userInfo?.totalIncome) {
      Swal.fire({
        icon: "error",
        title: "Insufficient Balance",
        text: "You don't have enough balance to withdraw this amount.",
      });
      setLoading(false);
      return;
    }
    checkEligibility();
    if (!eligibility) {
      setLoading(false);
      console.log(eligibility);
      return;
    }

    try {
      setLoading(true);

      if (!checkMetaMask() || !withdrawalAddress || !withdrawalPrivateKey)
        return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const wallet = new ethers.Wallet(withdrawalPrivateKey, provider);

      const amountInBNB = ethers.parseUnits(BNBAmount.toString(), 18);

      const tx = {
        to: walletAddress,
        value:  amountInBNB,
        gasLimit: 21000,
      };

      const txResponse = await wallet.sendTransaction(tx);
      await txResponse.wait();

      Swal.fire({
        icon: "success",
        title: "Withdrawal Successful",
        text: `You have successfully withdrawn ${BNBAmount} BNB!`,
      });

      setWithdrawalResponse(txResponse);
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error during withdrawal:", error);
      Swal.fire({
        icon: "error",
        title: "Withdrawal Failed",
        text: "There was an error during the withdrawal. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = async () => {
    setLoading(true);
    try {
      const response = await checkWithdrawEligibility({ amount });
      console.log(response);
      setEligibility(
        response?.withdrawalPermission === "Approved" ? true : false
      );
    } catch (error) {
      console.error("Error checking withdrawal eligibility:", error);
      setLoading(false);
      SwalError.fire({
        icon: "error",
        title: "Eligibility Status",
        text: error?.response?.data?.message || "An unexpected error occurred.",
      });
    } 
  };
  const setWithdrawalResponse = async (res) => {
    setLoading(true);
    try {
      await setWithdrawalTransaction({ response: res, amount });
    } catch (error) {
      console.error("Error set withdrawal response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="Withdrawal">
        <div className="ss-card half martop">
          <div className="top">
            <h5 className="heading">
              Main Wallet: $ {userInfo?.todayIncome?.toFixed(4) || "0"}
            </h5>
          </div>
          <div className="input-container">
            <TextInput
              placeholder={"Enter Amount"}
              labelName="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <SelectInput options={wallet} labelName="Choose Wallet" />
          </div>
          <div className="btns">
            <Button5 name={"Withdraw"} onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal Withdrawal-modal">
          <div className="modal-content">
            <h3>Withdrawal</h3>
            <p className="para">
              Current wallet balance: $ {userInfo?.totalIncome || "0"}
            </p>
            <p className="para">Withdraw Amount: $ {amount || "0"}</p>

            <div className="input-container">
              {!walletConnected ? (
                <button
                  onClick={handleConnectWallet}
                  className="btn btn-connect"
                >
                  Connect Wallet
                </button>
              ) : (
                <p className="para" style={{ color: "green" }}>
                  Wallet connected: {walletAddress}
                </p>
              )}
            </div>

            <div className="modal-actions">
              <Button5
                name="Withdraw"
                onClick={handleWithdraw}
                disabled={!walletConnected || parseFloat(amount) <= 0}
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Withdrawal;
