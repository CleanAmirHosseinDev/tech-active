import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const MetaMaskConnect = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState(null);

  const checkConnection = useCallback(async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(ethers.utils.getAddress(accounts[0]));
        }

        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(currentChainId);
      } catch (err) {
        console.error("Error checking connection:", err);
      }
    }
  }, []);

  useEffect(() => {
    checkConnection();

    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(ethers.utils.getAddress(accounts[0]));
          setError(null);
        } else {
          setAccount(null);
        }
      };

      const handleChainChanged = (newChainId) => {
        setChainId(newChainId);
        // Recommended to reload the page on chain change
        // window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum && window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [checkConnection]);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    if (!window.ethereum) {
      setError("MetaMask extension not installed");
      setIsConnecting(false);
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];

      // Validate address using ethers.js
      if (ethers.utils.isAddress(address)) {
        setAccount(ethers.utils.getAddress(address));
      } else {
        setError("Invalid wallet address received");
      }
    } catch (err) {
      if (err.code === 4001) {
        setError("User rejected connection request");
      } else {
        setError(err.message || "An error occurred during connection");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    // Note: MetaMask doesn't provide a true programmatic disconnect for the site.
    // We just clear our local state.
  };

  return (
    <div className="metamask-connect p-4 border rounded shadow-sm bg-white">
      <h3 className="text-lg font-bold mb-4">MetaMask Wallet Connection</h3>

      {!window.ethereum && (
        <div className="text-red-500 mb-4">
          MetaMask extension not detected. Please install it to continue.
        </div>
      )}

      {error && (
        <div className="text-red-500 mb-4 p-2 bg-red-50 rounded border border-red-200">
          {error}
        </div>
      )}

      {account ? (
        <div>
          <div className="mb-2 text-green-600 font-medium">Connected</div>
          <div className="mb-2 truncate bg-gray-100 p-2 rounded text-sm">
            <strong>Address:</strong> {account}
          </div>
          {chainId && (
            <div className="mb-4 text-sm text-gray-600">
              <strong>Network Chain ID:</strong> {chainId}
            </div>
          )}
          <button
            onClick={disconnectWallet}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className={`${
            isConnecting || !window.ethereum
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded transition-colors`}
        >
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </button>
      )}

      <div className="mt-4 text-xs text-gray-400">
        Status: {window.ethereum ? 'Provider available' : 'Provider not found'}
      </div>
    </div>
  );
};

export default MetaMaskConnect;
