import React, { ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';

interface SidebarItemProps {
  text: string;
  icon: ReactNode;
  id: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ text, icon, id }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: { type: text.toLowerCase(), text }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-3 rounded-md bg-gray-50 mb-3 flex items-center cursor-grab 
        ${isDragging ? 'opacity-50' : ''} hover:bg-gray-100 transition-colors`}
      style={{ ...style, border: '1px solid #e5e7eb' }}
    >
      <div className="mr-3">
        {icon}
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default SidebarItem; 