import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#468585] text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Shoppers Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;