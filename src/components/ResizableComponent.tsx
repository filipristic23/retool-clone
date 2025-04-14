import React, { useState, useRef, ReactNode } from 'react';

interface ResizableComponentProps {
  id: string;
  children: ReactNode;
  onDragStart?: (id: string) => void;
  isDragging?: boolean;
}

// Available width presets
const WIDTH_OPTIONS = ['100%', '50%'];

const ResizableComponent: React.FC<ResizableComponentProps> = ({ 
  id, 
  children, 
  onDragStart = () => {}, 
  isDragging = false 
}) => {
  const [width, setWidth] = useState<string>('100%');
  const componentRef = useRef<HTMLDivElement>(null);

  // Toggle between full and half width
  const handleToggleWidth = () => {
    setWidth(width === '100%' ? '50%' : '100%');
  };

  // Handle drag to reorder
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Call the parent's onDragStart function with this component's ID
    onDragStart(id);
  };

  return (
    <div 
      ref={componentRef}
      className={`relative mb-4 ${isDragging ? 'opacity-50' : ''}`}
      style={{ 
        width: width,
        transition: 'width 0.2s, opacity 0.2s',
      }}
    >
      {/* Width Controls */}
      <div className="absolute top-2 right-2 flex space-x-2 z-10">
        <button 
          onClick={handleToggleWidth}
          className="bg-gray-200 p-1 rounded-md hover:bg-gray-300 transition-colors"
          title={width === '100%' ? 'Switch to half width' : 'Switch to full width'}
        >
          {width === '100%' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="6" width="20" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v12" stroke="currentColor" strokeWidth="2"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="6" width="20" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )}
        </button>
      </div>
      
      {children}
      
      {/* Drag handle - for reordering */}
      <div 
        className="absolute bottom-0 right-0 w-6 h-6 cursor-move flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 rounded-tl"
        onMouseDown={handleDragStart}
        title="Drag to reorder"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="6" r="2" />
          <circle cx="9" cy="12" r="2" />
          <circle cx="9" cy="18" r="2" />
          <circle cx="15" cy="6" r="2" />
          <circle cx="15" cy="12" r="2" />
          <circle cx="15" cy="18" r="2" />
        </svg>
      </div>
    </div>
  );
};

export default ResizableComponent; 