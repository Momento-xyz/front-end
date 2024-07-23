'use client';

import { WALLETCONNECT_PROJECT_ID } from '@/config';
import { ReactNode } from 'react';

import { createWeb3Modal } from '@web3modal/wagmi/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { State, WagmiProvider } from 'wagmi';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { cookieStorage, createStorage } from 'wagmi';
import * as chains from 'wagmi/chains';
import { type Chain } from 'viem';

// Convert chains object to array and filter to include only valid Chain types
const supportedChainsArray = Object.values(chains).filter((chain) => {
  return (chain as Chain).id !== undefined;
}) as Chain[];

// Ensure the array has at least one element and cast it to a tuple type
if (supportedChainsArray.length === 0) {
  throw new Error('No valid chains found.');
}

const supportedChains: [Chain, ...Chain[]] = [
  supportedChainsArray[0],
  ...supportedChainsArray.slice(1),
];

// Create wagmiConfig
export const wagmiConfig = defaultWagmiConfig({
  chains: [...supportedChains],
  projectId: WALLETCONNECT_PROJECT_ID,
  metadata: {
    name: 'Web3Modal',
    description: 'Web3Modal',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  },
  ssr: true,
  syncConnectedChain: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
});

// Setup queryClient
const queryClient = new QueryClient();

// Create modal
createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId: WALLETCONNECT_PROJECT_ID,
  enableAnalytics: true,
});

export function ContextProvider({
  children,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
