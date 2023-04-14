import { format, parse } from 'date-fns';
import { useState } from 'react';

import useGetBookingsQuery from '@/hooks/useGetBookingsQuery';

import Calendar from './Calendar';
import ErrorState from './ErrorState';

const BookingCalendar = ({
  userId,
  propertyId,
}: {
  userId: string;
  propertyId: string;
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    format(new Date(), 'MM-yyyy')
  );

  const { isLoading, data, error, isError } = useGetBookingsQuery({
    propertyId,
    month: parse(currentMonth, 'MM-yyyy', new Date()).getMonth() + 1,
    year: parse(currentMonth, 'MM-yyyy', new Date()).getFullYear(),
  });

  if (isError) {
    console.log(error);
  }

  return (
    <>
      {isError && (
        <ErrorState>
          Fetching bookings failed. Please try again. If the issue persists,
          please reach out to support.
        </ErrorState>
      )}
      <div className="-ml-6 -mr-6">
        <Calendar
          setCurrentMonth={setCurrentMonth}
          currentMonth={currentMonth}
          events={data}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default BookingCalendar;
