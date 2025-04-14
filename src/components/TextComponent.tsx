import React, { useState } from 'react';

interface TextComponentProps {
  id: string;
}

const TextComponent: React.FC<TextComponentProps> = ({ id }) => {
  const [text, setText] = useState('Text content');
  const [isEditing, setIsEditing] = useState(true);

  return (
    <div className="w-full border border-gray-200 p-4 pr-12 rounded-md bg-white">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-500">Text Component</div>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="text-blue-500 text-sm hover:text-blue-700 ml-8"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      ) : (
        <p className="p-2">{text}</p>
      )}
    </div>
  );
};

export default TextComponent; 