import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FormErrorMessage: React.FC<Props> = ({ children }) => {
  return (
    <p className="mt-2 text-sm text-red-600" id="email-error">
      {children}
    </p>
  );
};

export default FormErrorMessage;
