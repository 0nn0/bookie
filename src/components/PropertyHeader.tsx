import React from 'react';

import PropertyNav from './PropertyNav';
import Headline from './ui/Headline';

interface Props {
  headline: string;
  propertyId: string;
  roleId: string;
}

const PropertyHeader = ({ headline, propertyId, roleId }: Props) => {
  return (
    <div className="mb-8">
      <Headline level={1}>{headline}</Headline>
      <PropertyNav propertyId={propertyId} roleId={roleId} />
    </div>
  );
};

export default PropertyHeader;
