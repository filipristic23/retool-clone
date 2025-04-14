import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';
import ResizableComponent from './ResizableComponent';

interface DroppedComponent {
  id: string;
  type: string;
  text: string;
}

interface ContentAreaProps {
  droppedComponents: DroppedComponent[];
  isPreviewMode?: boolean;
  togglePreviewMode?: () => void;
  onReorderComponents?: (newOrder: DroppedComponent[]) => void;
}

const ContentArea: React.FC<ContentAreaProps> = ({ 
  droppedComponents, 
  isPreviewMode = false,
  togglePreviewMode = () => {},
  onReorderComponents = () => {}
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'content-area',
  });

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (draggedId && draggedId !== id) {
      setDragOverId(id);
    }
  };

  const handleDrop = () => {
    if (draggedId && dragOverId && draggedId !== dragOverId) {
      const newComponents = [...droppedComponents];
      
      // Find the indices of the dragged and target components
      const draggedIndex = newComponents.findIndex(comp => comp.id === draggedId);
      const targetIndex = newComponents.findIndex(comp => comp.id === dragOverId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        // Remove the dragged component
        const [draggedComponent] = newComponents.splice(draggedIndex, 1);
        
        // Insert it at the target position
        newComponents.splice(targetIndex, 0, draggedComponent);
        
        // Update the order in the parent component
        onReorderComponents(newComponents);
      }
    }
    
    // Reset drag state
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  // Manual drag implementation
  const handleMouseMove = (e: MouseEvent) => {
    if (draggedId) {
      // Find the element under the cursor
      const elementsAtPosition = document.elementsFromPoint(e.clientX, e.clientY);
      
      // Find component elements
      const componentElement = elementsAtPosition.find(el => {
        return el.getAttribute('data-component-id') && el.getAttribute('data-component-id') !== draggedId;
      });
      
      if (componentElement) {
        const id = componentElement.getAttribute('data-component-id');
        if (id) {
          setDragOverId(id);
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (draggedId && dragOverId) {
      handleDrop();
    }
    
    handleDragEnd();
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Set up document-level event listeners when drag starts
  React.useEffect(() => {
    if (draggedId) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedId, dragOverId]);

  return (
    <div className="flex-1 p-4 bg-gray-50">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Content Area</h2>
        <button 
          onClick={togglePreviewMode}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {isPreviewMode ? 'Edit' : 'Preview'}
        </button>
      </div>
      <div 
        ref={!isPreviewMode ? setNodeRef : undefined}
        className={`p-4 bg-white rounded-md min-h-[calc(100vh-8rem)] ${!isPreviewMode && isOver ? 'bg-gray-50' : ''}`}
      >
        {droppedComponents.length > 0 ? (
          <div className="flex flex-col items-start">
            {droppedComponents.map((component) => (
              <div 
                key={component.id}
                data-component-id={component.id}
                className={dragOverId === component.id ? 'border-t-2 border-blue-500 w-full' : 'w-full'}
              >
                <ResizableComponent 
                  id={component.id} 
                  onDragStart={!isPreviewMode ? handleDragStart : undefined}
                  isDragging={draggedId === component.id}
                >
                  {component.type === 'text' ? (
                    <TextComponent id={component.id} />
                  ) : component.type === 'image' ? (
                    <ImageComponent id={component.id} />
                  ) : null}
                </ResizableComponent>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center">
            {!isPreviewMode && isOver ? (
              <p className="text-gray-500">Drop component here</p>
            ) : (
              <p className="text-gray-400">{isPreviewMode ? 'No content to preview' : 'Drag and drop components here'}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentArea; 