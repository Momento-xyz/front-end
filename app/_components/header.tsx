'use client';

import ConnectButton from '@/components/buttons/connect';

const Header = () => {
  return (
    <header className="flex flex-col px-6 py-7 border-red-500 border-4">
      <ConnectButton />
    </header>
  );
};
export default Header;
