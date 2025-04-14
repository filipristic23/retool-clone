import React from 'react';
import SidebarItem from './SidebarItem';

const TextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 10h8M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
    <path d="M6 19l4-4 2 2 4-4 2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Sidebar: React.FC = () => {
  return (
    <div className="p-4 rounded-md bg-white" style={{ width: '300px', borderRight: '1px solid #e5e7eb' }}>
      <h2 className="text-base font-semibold mb-4">Components</h2>
      <div className="flex">
        <SidebarItem text="Text" icon={<TextIcon />} />
        <SidebarItem text="Image" icon={<ImageIcon />} />
      </div>
    </div>
  );
};

export default Sidebar; 