import React from "react";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => (
  <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
);

export default Container;
