import React from 'react';

import Container from './ui/Container';

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <main>
      <Container>{children}</Container>
    </main>
  );
};
export default Main;
