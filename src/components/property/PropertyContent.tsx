import React from 'react';

// Add margin to the bottom to compensate for the fixed footer
export default function PropertyContent({ children }) {
  return <div className="pb-32">{children}</div>;
}
