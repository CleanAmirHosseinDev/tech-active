import React from 'react';
import DashContent from '../components/micro/DashContent';
import MetaMaskConnect from '../components/Wallet/MetaMaskConnect';

const WalletTest = () => {
  return (
    <DashContent>
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Wallet Connection Testing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <MetaMaskConnect />
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-lg font-semibold mb-4 text-blue-800">Testing Instructions</h2>
            <ul className="list-disc list-inside space-y-2 text-blue-700">
              <li>Click "Connect MetaMask" to initiate connection.</li>
              <li>Verify that the address is displayed correctly after approval.</li>
              <li>Switch accounts in MetaMask and observe the UI updating.</li>
              <li>Switch networks and check if the Chain ID updates.</li>
              <li>Click "Disconnect" to clear the local state.</li>
              <li>Try connecting when MetaMask is locked or disabled.</li>
            </ul>
          </div>
        </div>
      </div>
    </DashContent>
  );
};

export default WalletTest;
