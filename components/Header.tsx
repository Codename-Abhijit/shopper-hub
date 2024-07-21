import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const router = useRouter();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <header className="bg-[#468585] dark:bg-[#222] text-white dark:text-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-bold bg-transparent border-none cursor-pointer hover:text-[#DEF9C4] dark:hover:text-gray-400"
        >
          Shoppers Hub
        </button>
        <button
          onClick={toggleTheme}
          className="bg-[#DEF9C4] dark:bg-gray-600 text-[#468585] dark:text-gray-200 p-2 rounded cursor-pointer"
        >
          {theme === 'light' ? '🌑 Dark Mode' : '☀️ Light mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
