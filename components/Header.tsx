import React from 'react';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <header className="bg-[#468585] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-bold bg-transparent border-none cursor-pointer hover:text-[#DEF9C4]"
        >
          Shoppers Hub
        </button>
      </div>
    </header>
  );
};

export default Header;
