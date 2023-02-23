import React from 'react';

import { RoleIdByName } from '@/constants/constants';
import useGetPropertiesQuery from '@/hooks/useGetPropertiesQuery';

import BookingList from './BookingList';
import LoadingState from './LoadingState';
import SectionHeading from './SectionHeading';

const OwnedPropertyBookings = () => {
  let { isLoading, data } = useGetPropertiesQuery(RoleIdByName.Owner);

  if (isLoading) return <LoadingState />;

  if (data && data.length > 0) {
    return (
      <>
        <div className="mt-16 mb-6">
          <SectionHeading title="Property bookings" />
        </div>

        <BookingList
          filter="UPCOMING"
          propertyIds={data?.map((item) => item.properties?.id)}
        />
      </>
    );
  }

  return null;
};

export default OwnedPropertyBookings;
