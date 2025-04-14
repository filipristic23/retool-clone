import React, { ReactNode } from 'react';

interface SidebarItemProps {
  text: string;
  icon: ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ text, icon }) => {
  return (
    <div className="w-1/2 p-4 m-4 bg-gray-50 mb-3 flex items-center cursor-grab" style={{ border: '1px solid #e5e7eb' }}>
      <div className="mr-3">
        {icon}
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default SidebarItem; 