import useGetBookingsQuery from '@/hooks/useGetBookingsQuery';
import { CalendarFilter } from '@/pages/properties/[id]/calendar';

import BookingListItem from './BookingListItem';
import Card from './Card';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import LoadingState from './LoadingState';

const BookingList = ({
  userId,
  propertyId,
  filter,
}: {
  userId: string;
  filter: CalendarFilter;
  propertyId?: string;
}) => {
  const { isLoading, data, error, isError } = useGetBookingsQuery({
    propertyId,
    userId,
    filter,
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    console.error('Fetching bookings failed', { error });
    return (
      <ErrorState>
        Fetching bookings failed. Please try again. If the issue persists,
        please reach out to support.
      </ErrorState>
    );
  }

  if (!data || data.length === 0) {
    const copy = {
      UPCOMING: 'You have no upcoming bookings',
      ALL: 'You have no bookings',
    };

    return <EmptyState>{copy[filter]}</EmptyState>;
  }

  return (
    <Card>
      <div className="divide-y divide-gray-200">
        {data.map((item) => {
          const {
            id,
            start_date,
            end_date,
            status,
            properties,
            guests_owners,
          } = item;

          const { first_name, last_name, avatar_url } = guests_owners.profiles;

          return (
            <BookingListItem
              key={id}
              id={id}
              startDate={start_date}
              endDate={end_date}
              status={status}
              firstName={first_name}
              lastName={last_name}
              avatarUrl={avatar_url}
              propertyId={properties.id}
              propertyName={properties.name}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default BookingList;
