import React from 'react';

// Add margin to the bottom to compensate for the fixed footer
const PropertyContent = ({ children }) => {
  return <div className="mb-32">{children}</div>;
};

export default PropertyContent;
