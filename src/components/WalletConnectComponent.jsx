import React from 'react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';

// Define the chains you want to support
const chains = [arbitrum, mainnet, polygon];

// Use your Infura/Alchemy project ID here
const projectId = 'YOUR_PROJECT_ID';

// Set up the Wagmi client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
});

// Initialize EthereumClient from Web3Modal
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  const [modalVisible, setModalVisible] = React.useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <div>
          <button onClick={openModal}>Connect Wallet</button>
        </div>
      </WagmiConfig>

      {/* Show the Web3Modal when the button is clicked */}
      {modalVisible && (
        <Web3Modal
          projectId={projectId}
          ethereumClient={ethereumClient}
          cacheProvider
          onClose={closeModal} // Close the modal when the user disconnects
        />
      )}
    </>
  );
}

export default App;
