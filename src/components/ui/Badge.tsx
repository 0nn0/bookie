import React from 'react';

const Badge = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: 'success' | 'warning' | 'danger';
}) => {
  const typeToColor = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeToColor[type]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
