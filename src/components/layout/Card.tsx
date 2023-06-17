import React from 'react';

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-10 overflow-hidden rounded-lg bg-white shadow">
      {children}
    </div>
  );
};

export default Card;
