import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MetaMaskConnect from './MetaMaskConnect';
import { ethers } from 'ethers';

// Mock ethers
jest.mock('ethers', () => {
  const original = jest.requireActual('ethers');
  return {
    ...original,
    ethers: {
      ...original.ethers,
      utils: {
        ...original.ethers.utils,
        isAddress: jest.fn(),
        getAddress: jest.fn(),
      }
    }
  };
});

describe('MetaMaskConnect Component', () => {
  let mockEthereum;

  beforeEach(() => {
    mockEthereum = {
      request: jest.fn(),
      on: jest.fn(),
      removeListener: jest.fn(),
    };
    window.ethereum = mockEthereum;

    ethers.utils.isAddress.mockImplementation((addr) => addr.startsWith('0x'));
    ethers.utils.getAddress.mockImplementation((addr) => addr);
  });

  afterEach(() => {
    delete window.ethereum;
    jest.clearAllMocks();
  });

  test('renders connect button when not connected', async () => {
    mockEthereum.request.mockResolvedValueOnce([]); // eth_accounts
    mockEthereum.request.mockResolvedValueOnce('0x1'); // eth_chainId

    await act(async () => {
      render(<MetaMaskConnect />);
    });

    expect(screen.getByText('Connect MetaMask')).toBeInTheDocument();
  });

  test('handles successful connection', async () => {
    const mockAddress = '0x1234567890123456789012345678901234567890';
    mockEthereum.request.mockResolvedValueOnce([]); // eth_accounts (initial check)
    mockEthereum.request.mockResolvedValueOnce('0x1'); // eth_chainId (initial check)
    mockEthereum.request.mockResolvedValueOnce([mockAddress]); // eth_requestAccounts

    await act(async () => {
      render(<MetaMaskConnect />);
    });

    const connectButton = screen.getByText('Connect MetaMask');

    await act(async () => {
      fireEvent.click(connectButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Connected')).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockAddress))).toBeInTheDocument();
    });
  });

  test('handles user rejection', async () => {
    mockEthereum.request.mockResolvedValueOnce([]); // eth_accounts
    mockEthereum.request.mockResolvedValueOnce('0x1'); // eth_chainId
    mockEthereum.request.mockRejectedValueOnce({ code: 4001 }); // User rejected

    await act(async () => {
      render(<MetaMaskConnect />);
    });

    const connectButton = screen.getByText('Connect MetaMask');

    await act(async () => {
      fireEvent.click(connectButton);
    });

    await waitFor(() => {
      expect(screen.getByText('User rejected connection request')).toBeInTheDocument();
    });
  });

  test('handles MetaMask not installed', async () => {
    delete window.ethereum;

    await act(async () => {
      render(<MetaMaskConnect />);
    });

    expect(screen.getByText('MetaMask extension not detected. Please install it to continue.')).toBeInTheDocument();

    const connectButton = screen.getByText('Connect MetaMask');

    await act(async () => {
      fireEvent.click(connectButton);
    });

    expect(screen.getByText('MetaMask extension not installed')).toBeInTheDocument();
  });

  test('handles account change', async () => {
    let accountsChangedCallback;
    mockEthereum.on.mockImplementation((event, callback) => {
      if (event === 'accountsChanged') {
        accountsChangedCallback = callback;
      }
    });

    mockEthereum.request.mockResolvedValueOnce([]); // eth_accounts
    mockEthereum.request.mockResolvedValueOnce('0x1'); // eth_chainId

    await act(async () => {
      render(<MetaMaskConnect />);
    });

    const newAddress = '0xabcdef0123456789abcdef0123456789abcdef01';
    await act(async () => {
      accountsChangedCallback([newAddress]);
    });

    expect(screen.getByText('Connected')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(newAddress))).toBeInTheDocument();
  });

  test('handles disconnect', async () => {
    const mockAddress = '0x1234567890123456789012345678901234567890';
    mockEthereum.request.mockResolvedValueOnce([mockAddress]); // eth_accounts
    mockEthereum.request.mockResolvedValueOnce('0x1'); // eth_chainId

    await act(async () => {
      render(<MetaMaskConnect />);
    });

    expect(screen.getByText('Connected')).toBeInTheDocument();

    const disconnectButton = screen.getByText('Disconnect');
    fireEvent.click(disconnectButton);

    expect(screen.getByText('Connect MetaMask')).toBeInTheDocument();
  });
});
