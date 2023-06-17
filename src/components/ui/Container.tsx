import React from 'react';

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-6 lg:px-8">{children}</div>
  );
}
