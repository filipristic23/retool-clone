import React from 'react';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <ContentArea />
    </div>
  );
};

export default Layout; 