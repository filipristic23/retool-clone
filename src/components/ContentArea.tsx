import React from 'react';

const ContentArea: React.FC = () => {
  return (
    <div className="vl-all-p-4 flex-grow-1 bg-gray-50">
      <div className="flex justify-between vl-all-mb-4">
        <h2 className="vl-all-text-medium-bold">Content Area</h2>
        <button className="vl-border-radius-small vl-all-p-2 vl-all-text-small">
          Preview
        </button>
      </div>
      <div className="vl-all-p-4 bg-white vl-border-radius-small" style={{ minHeight: 'calc(100vh - 100px)' }}>
        {/* Dropped components will appear here */}
      </div>
    </div>
  );
};

export default ContentArea; 