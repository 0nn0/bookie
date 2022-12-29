import React from 'react';

import Headline from '@/components/ui/Headline';
import Text from '@/components/ui/Text';

const DesignSystem: React.FC = () => {
  return (
    <div>
      <Headline level={1}>Headline 1</Headline>
      <Headline level={2}>Headline 2</Headline>
      <Headline level={3}>Headline 3</Headline>
      <Headline level={4} bold>
        Headline 4
      </Headline>
      <Headline level={5}>Headline 5</Headline>
      <Headline level={6}>Headline 6</Headline>
      <Text>The quick brown fox jumps over the lazy dog.</Text>
    </div>
  );
};

export default DesignSystem;
