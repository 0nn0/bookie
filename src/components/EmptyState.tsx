import React from 'react';

const EmptyState = ({ children }) => {
  return (
    <div className="flex h-24 items-center justify-center text-center text-sm text-gray-400">
      {children}
    </div>
  );
};

export default EmptyState;
