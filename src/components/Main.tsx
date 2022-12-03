import React from "react";
import Container from "./Container";

interface Props {
  children: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <main>
      <Container>{children}</Container>
    </main>
  );
};
export default Main;
