import React from 'react';

import Spinner from './Spinner';

const LoadingState = () => {
  return (
    <div className="flex h-24 flex-col items-center justify-center">
      <Spinner />
    </div>
  );
};

export default LoadingState;
