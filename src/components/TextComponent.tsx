import React, { useState } from 'react';

interface TextComponentProps {
  id: string;
  isPreviewMode?: boolean;
  content?: string;
  onChange?: (content: string) => void;
}

const TextComponent: React.FC<TextComponentProps> = ({ 
  id, 
  isPreviewMode = false,
  content = 'Text content',
  onChange = () => {}
}) => {
  if (isPreviewMode) {
    return (
      <div className="w-full">
        <p className="vl-all-text-medium">{content}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[14rem] flex flex-col border border-gray-200 rounded-md p-4 bg-white">
      <div className="flex justify-between items-center mb-2 flex-shrink-0">
        <div className="text-sm text-gray-500">Text Component</div>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow resize-none bg-gray-50"
        autoFocus
      />
    </div>
  );
};

export default TextComponent; 