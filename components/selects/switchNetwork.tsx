'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';

const SwitchNetworkSelect: React.FC = () => {
  const { chains, switchChain } = useSwitchChain();
  const chainId = useChainId();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChains = chains.filter(
    (chain) =>
      chain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${chain.id}`.includes(searchTerm.toLowerCase()),
  );

  const selectedChain = chains.find((chain) => chain.id === chainId);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-64" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 shadow"
      >
        {selectedChain ? selectedChain.name : 'Select Network'}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 border border-gray-300 shadow-lg">
          <input
            type="text"
            className="w-full px-3 py-2 border-b border-gray-300 bg-black"
            placeholder="Search network..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-60 overflow-auto">
            {filteredChains.map((chain, index) => (
              <li key={index}>
                <button
                  className={clsx(
                    'w-full text-left px-4 py-2 bg-black hover:bg-gray-800',
                    selectedChain?.id === chain.id && 'bg-gray-700',
                  )}
                  onClick={() => {
                    switchChain({ chainId: chain.id });
                    setIsOpen(false);
                  }}
                >
                  {chain.id}: {chain.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SwitchNetworkSelect;
