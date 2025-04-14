import React, { useState } from 'react';

interface ImageComponentProps {
  id: string;
  content?: string | null;
  onChange?: (content: string | null) => void;
  isPreviewMode?: boolean;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ 
  id,
  content = null,
  onChange = () => {},
  isPreviewMode = false
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // In a real app, you would upload the file to a server
      // For this demo, we'll just create a local URL
      const url = URL.createObjectURL(file);
      onChange(url);
      setIsUploading(false);
    }
  };

  if (isPreviewMode) {
    return content ? (
      <div className="w-full">
        <img 
          src={content}
          alt="Uploaded"
          className="w-full h-auto object-contain max-w-[700px] mx-auto"
        />
      </div>
    ) : null;
  }

  return (
    <div className="w-full border border-gray-200 p-4 pr-12 rounded-md bg-white">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-500">Image Component</div>
        <label className="text-blue-500 text-sm hover:text-blue-700 cursor-pointer ml-8">
          {content ? 'Replace Image' : 'Upload Image'}
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
      
      {content ? (
        <div className="flex justify-center">
          <img 
            src={content}
            alt="Uploaded"
            className="w-full h-auto object-contain max-h-64"
          />
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded-md">
          {isUploading ? (
            <p className="text-gray-500">Uploading...</p>
          ) : (
            <>
              <p className="text-gray-500 mb-2">No image uploaded</p>
              <label className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors">
                Select Image
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageComponent; 