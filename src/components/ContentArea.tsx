import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';

interface DroppedComponent {
  id: string;
  type: string;
  text: string;
}

interface ContentAreaProps {
  droppedComponents: DroppedComponent[];
  isPreviewMode?: boolean;
  togglePreviewMode?: () => void;
}

const ContentArea: React.FC<ContentAreaProps> = ({ 
  droppedComponents, 
  isPreviewMode = false,
  togglePreviewMode = () => {}
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'content-area',
  });

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
          <div className="space-y-4">
            {droppedComponents.map((component) => {
              if (component.type === 'text') {
                return <TextComponent key={component.id} id={component.id} />;
              } else if (component.type === 'image') {
                return <ImageComponent key={component.id} id={component.id} />;
              }
              return null;
            })}
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