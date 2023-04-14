import useGetBookingsQuery, {
  BookingsByProperty,
  BookingsByUser,
} from '@/hooks/useGetBookingsQuery';

import BookingListItem from './BookingListItem';
import Card from './Card';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import LoadingState from './LoadingState';

type ConditionalProps = BookingsByProperty | BookingsByUser;

const BookingList = (props: ConditionalProps) => {
  const { isLoading, data, error, isError } = useGetBookingsQuery(props);

  console.log({ data });

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

    return <EmptyState>{copy[props.filter]}</EmptyState>;
  }

  return (
    <Card>
      <div className="divide-y divide-gray-200">
        {data.map((item) => {
          const { id, start_date, end_date, status_id, fact_table } = item;

          const avatarUrl = fact_table.profiles?.avatar_url;
          const updatedAt = fact_table.profiles?.updated_at;
          const firstName = fact_table.profiles?.first_name;
          const lastName = fact_table.profiles?.last_name;
          const profileId = fact_table.profiles?.id;
          const propertyId = fact_table.properties.id;
          const propertyName = fact_table.properties.name;

          return (
            <BookingListItem
              key={id}
              id={id}
              profileId={profileId}
              startDate={start_date}
              endDate={end_date}
              statusId={status_id}
              firstName={firstName}
              lastName={lastName}
              avatarUrl={`${avatarUrl}?${updatedAt}`}
              propertyId={propertyId}
              propertyName={propertyName}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default BookingList;
