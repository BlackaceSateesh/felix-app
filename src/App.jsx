import "aos/dist/aos.css";
import "./App.css";
import Navigation from "./screens/navigations/Navigation";
import "../src/styles/GlobalStyle.css";
import { useEffect } from "react";
import Aos from "aos";
// import WalletConnectComponent from "./components/WalletConnectComponent";
const App = () => {
  console.clear();
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return <Navigation />;
  // return <WalletConnectComponent />;
};

export default App;

// import { useEffect, useState } from "react";
// import { ethers } from "ethers";

// // Use the BNB Chain Mainnet or Testnet URL
// const providerUrl = 'https://bsc-dataseed.binance.org/'; // Mainnet for BNB Chain

// // Initialize a custom provider for BNB Chain (BSC)
// const provider = new ethers.JsonRpcProvider(providerUrl); // v6.x usage for custom provider

// // Detect BNB Wallet (MetaMask or others)
// const { ethereum } = window;

// function App() {
//   const [balance, setBalance] = useState("Loading...");
//   const [currentAccount, setCurrentAccount] = useState(null);
//   const [transferBalance, setTransferBalance] = useState();
//   const [transferAddress, setTransferAddress] = useState();

//   useEffect(() => {
//     checkWalletIsConnected();
//   }, []);

//   // Transfer BNB function
//   function transferBNB() {
//     let wallet = new ethers.Wallet('e513af93181bb2c87044595c59c0c1a77a6159e39543c323bb5332fa51119f51', provider); // Add private key securely
//     let receiverAddress = transferAddress;
//     let amountInEther = transferBalance;

//     let tx = {
//       to: receiverAddress,
//       value: ethers.utils.parseEther(amountInEther)
//     };

//     // Send a transaction
//     wallet.sendTransaction(tx).then((txObj) => {
//       console.log('txHash', txObj.hash);
//     });
//   }

//   // Check if the wallet is connected
//   const checkWalletIsConnected = async () => {
//     if (!ethereum) {
//       console.log("Make sure you have a BNB Wallet (like MetaMask) installed!");
//       return;
//     } else {
//       console.log("Wallet exists! We're ready to go!");
//     }

//     const accounts = await ethereum.request({ method: 'eth_accounts' });

//     if (accounts.length !== 0) {
//       const account = accounts[0];
//       console.log("Found an authorized account: ", account);
//       setCurrentAccount(account);

//       provider.getBalance(account).then((balance) => {
//         const balanceInEth = ethers.utils.formatEther(balance);
//         setBalance(`${balanceInEth} BNB`);
//       });
//     } else {
//       console.log("No authorized account found");
//     }
//   };

//   // Connect wallet handler
//   const connectWalletHandler = async () => {
//     if (!ethereum) {
//       alert("Please install a BNB Wallet like MetaMask!");
//     }

//     try {
//       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//       console.log("Found an account! Address: ", accounts[0]);
//       setCurrentAccount(accounts[0]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const connectWalletButton = () => {
//     return (
//       <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
//         Connect Wallet
//       </button>
//     );
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {currentAccount ? (
//           <div>
//             <h2>BNB Chain</h2>
//             <br />
//             Connected Account: {currentAccount}
//             <br /><br />
//             Balance: {balance}
//             <br /><br />
//             BNB Transfer Address: <input type="text" value={transferAddress} onChange={e => setTransferAddress(e.target.value)} />
//             <br />
//             BNB Transfer Balance: <input type="number" value={transferBalance} onChange={e => setTransferBalance(e.target.value)} />
//             <br />
//             <input type="button" value="Transfer" onClick={transferBNB} />
//           </div>
//         ) : connectWalletButton()}
//       </header>
//     </div>
//   );
// }

// export default App;
