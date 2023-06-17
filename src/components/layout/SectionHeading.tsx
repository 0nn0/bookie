import React from 'react';

import Headline from '../ui/Headline';

type Props = {
  title: string;
  action?: React.ReactNode;
};

const SectionHeading = ({ title, action }: Props) => {
  return (
    <div className="mb-4 flex items-center">
      <div className="flex-auto">
        <Headline size="h1">{title}</Headline>
      </div>
      <div className="ml-4 flex-none sm:mt-0">{action}</div>
    </div>
  );
};

export default SectionHeading;
