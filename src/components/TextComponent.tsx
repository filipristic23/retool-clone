import React, { useState } from 'react';

interface TextComponentProps {
  id: string;
  isPreviewMode?: boolean;
}

const TextComponent: React.FC<TextComponentProps> = ({ id, isPreviewMode = false }) => {
  const [text, setText] = useState('Text content');
  const [isEditing, setIsEditing] = useState(true);

  if (isPreviewMode) {
    return (
      <div className="w-full min-h-[14rem] flex items-center justify-center">
        <p className="p-2 overflow-auto">{text}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[14rem] flex flex-col border border-gray-200 rounded-md p-4 bg-white">
      <div className="flex justify-between items-center mb-2 flex-shrink-0">
        <div className="text-sm text-gray-500">Text Component</div>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="text-blue-500 text-sm hover:text-blue-700 ml-8"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      
      {isEditing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow resize-none bg-gray-50"
          autoFocus
        />
      ) : (
        <p className="p-2 flex-grow overflow-auto">{text}</p>
      )}
    </div>
  );
};

export default TextComponent; 