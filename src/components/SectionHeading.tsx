import React from 'react';

type Props = {
  title: string;
};

const SectionHeading = ({ title }: Props) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default SectionHeading;
