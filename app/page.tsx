'use client';
import SwitchNetworkSelect from '@/components/selects/switchNetwork';
import { wagmiConfig } from '@/context';
import { useAccount, useSwitchChain } from 'wagmi';
import { useChainId } from 'wagmi';

export default function Home() {
  const account = useAccount();

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <SwitchNetworkSelect />
      </div>
    </div>
  );
}
