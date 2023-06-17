import React from 'react';

interface Props {
  htmlFor: string;
  children: React.ReactNode;
}

const Label = ({ htmlFor, children }: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  );
};

export default Label;
