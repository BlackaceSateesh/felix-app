/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { Button2 } from "../ui/Buttons"; // Assuming you have this component for styled buttons
import { buyPlanPackage } from "../../api/wallet-api";
import { convertUSDToBNB } from "../../utils/additionalFunc";
import PageLoader from "../ui/PageLoader";

const BNBPayment = ({ amount, onSuccess, onFailure }) => {
  const [loading, setLoading] = useState(false);
  const [BNBAmount, setBNBAmount] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false); // State to track wallet connection
  const paymentAddress = import.meta.env.VITE_PAYMENT_ADDRESS;

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

  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Request user to connect their wallet
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Get the connected wallet address
        const userAddress = await signer.getAddress();
        console.log("Connected wallet address:", userAddress);

        // Update state to reflect that wallet is connected
        setWalletConnected(true);
      } else {
        throw new Error("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);

      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: "Failed to connect wallet. Please try again.",
      });
    }
  };

  const transactionHandler = async (transactionDetail) => {
    try {
      await buyPlanPackage(transactionDetail);
    } catch (error) {
      console.error("Error during BNB payment:", error);
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        // const fromAddress = signer?.address;
        // console.log(signer?.address);

        const amountInBNB = ethers.parseUnits(BNBAmount.toString(), 18); // Amount in Wei

        const tx = {
          to: paymentAddress,
          value: amountInBNB,
          gasLimit: "21000",
          //   gasLimit: ethers.BigNumber.from("21000"),
          //   gasPrice: ethers.BigNumber.from("1000000000"),
        };
        console.log(tx);

        const txResponse = await signer.sendTransaction(tx);
        console.log("Transaction response:", txResponse);

        await txResponse.wait();
        console.log("Transaction confirmed:", txResponse);

        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: `Transaction confirmed. You have successfully sent ${BNBAmount} BNB.`,
        });

        transactionHandler({ txResponse, packageAmount: amount });
        onSuccess();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        throw new Error("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error during BNB payment:", error);

      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Payment failed. Please try again.",
      });

      onFailure();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      {loading && <PageLoader />}
      <h3>
        Pay <b>{BNBAmount}</b> BNB
      </h3>

      <div className="btns">
        {!walletConnected ? (
          <Button2 onClick={handleConnectWallet} name="Connect Wallet" />
        ) : (
          <p style={{ color: "green", fontSize: "1.4rem" }}>
            Wallet is connected
          </p>
        )}

        <Button2
          onClick={handlePayment}
          name={"Pay with BNB"}
          disabled={loading || !walletConnected}
        />
      </div>
    </div>
  );
};

export default BNBPayment;
