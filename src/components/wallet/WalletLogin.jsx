// WalletLogin.js
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const providerUrl = 'https://bsc-dataseed.binance.org/'; // Mainnet for BNB Chain
const provider = new ethers.JsonRpcProvider(providerUrl); // BNB Chain provider

const WalletLogin = ({ onLoginSuccess }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [message, setMessage] = useState("Please log in using your BNB wallet.");
  const [loading, setLoading] = useState(false);

  const { ethereum } = window;

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  const checkWalletIsConnected = async () => {
    if (!ethereum) {
      setMessage("Make sure you have a BNB wallet (MetaMask or others) installed.");
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      const account = accounts[0];
      setCurrentAccount(account);
      setMessage(`Logged in as: ${account}`);
    } else {
      setMessage("Please connect your wallet to log in.");
    }
  };

  // Handle the wallet connection
  const connectWalletHandler = async () => {
    if (!ethereum) {
      alert("Please install a BNB wallet like MetaMask!");
      return;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setCurrentAccount(account);
      setMessage(`Logged in as: ${account}`);
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setMessage("Failed to connect wallet.");
    }
  };

  // Handle login by signing a message
  const handleLoginWithMessage = async () => {
    if (!ethereum) {
      alert("Please install MetaMask or another BNB wallet.");
      return;
    }

    if (!currentAccount) {
      alert("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    const signer = provider.getSigner();
    const loginMessage = `Login to my app with your wallet address: ${currentAccount}`;

    try {
      const signature = await signer.signMessage(loginMessage);
      console.log("Signed message:", signature);

      // Send the signed message to backend for verification (e.g., using an API)
      // If everything is okay, you can trigger a success callback
      onLoginSuccess(currentAccount, signature);
      
      alert("Login successful! Message signed.");
    } catch (error) {
      console.error("Error signing message:", error);
      alert("Error signing message.");
    }
    setLoading(false);
  };

  return (
    <div>
      {currentAccount ? (
        <div>
          <h2>BNB Wallet Login</h2>
          <p>{message}</p>
          <button onClick={handleLoginWithMessage} className="cta-button" disabled={loading}>
            {loading ? "Signing..." : "Sign Message to Login"}
          </button>
        </div>
      ) : (
        <div>
          <h2>BNB Wallet Login</h2>
          <p>{message}</p>
          <button onClick={connectWalletHandler} className="cta-button">
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletLogin;
