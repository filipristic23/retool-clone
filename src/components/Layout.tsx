import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';

interface DroppedComponent {
  id: string;
  type: string;
  text: string;
  width?: string;
}

const Layout: React.FC = () => {
  const [droppedComponents, setDroppedComponents] = useState<DroppedComponent[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    
    if (over && over.id === 'content-area' && !isPreviewMode) {
      const newComponent = {
        id: `${active.data.current?.type}-${Date.now()}`,
        type: active.data.current?.type,
        text: active.data.current?.text,
        width: '100%' // Default width for new components
      };
      
      setDroppedComponents([...droppedComponents, newComponent]);
    }
  };

  const handleReorderComponents = (newOrder: DroppedComponent[]) => {
    setDroppedComponents(newOrder);
  };

  const handleComponentWidthChange = (id: string, width: string) => {
    console.log(`Changing width of component ${id} to ${width}`);
    
    const updatedComponents = droppedComponents.map(component => 
      component.id === id 
        ? { ...component, width } 
        : component
    );
    
    setDroppedComponents(updatedComponents);
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex min-h-screen bg-gray-100">
        {!isPreviewMode && <Sidebar />}
        <div className={`flex-1 ${isPreviewMode ? 'p-0' : 'p-4'}`}>
          <ContentArea 
            droppedComponents={droppedComponents}
            isPreviewMode={isPreviewMode}
            togglePreviewMode={togglePreviewMode}
            onReorderComponents={handleReorderComponents}
            onComponentWidthChange={handleComponentWidthChange}
          />
        </div>
      </div>
    </DndContext>
  );
};

export default Layout; 