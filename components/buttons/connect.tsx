'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import React from 'react';
import { useAccount } from 'wagmi';

const ConnectButton: React.FC = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  const slicedAddress = address
    ? `${address.slice(0, 5)}...${address.slice(-3)}`
    : '';

  return (
    <>
      {isConnected && address ? (
        <button
          onClick={() => open({ view: 'Account' })}
          className="border border-white w-fit px-4 py-2"
        >
          {slicedAddress}
        </button>
      ) : (
        <button
          onClick={() => open({ view: 'Connect' })}
          className="border border-white w-fit px-4 py-2"
        >
          Connect Wallet
        </button>
      )}
    </>
  );
};
export default ConnectButton;
