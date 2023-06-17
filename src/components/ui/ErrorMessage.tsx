import React from 'react';

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="mt-2 text-sm text-red-600" id="email-error">
      {children}
    </p>
  );
};

export default ErrorMessage;
