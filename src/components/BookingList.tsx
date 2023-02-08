import useGetBookingsQuery from '@/hooks/useGetBookingsQuery';
import { CalendarFilter } from '@/pages/properties/[id]/calendar';

import BookingListItem from './BookingListItem';
import Card from './Card';

const BookingList = ({
  propertyId,
  roleId,
  guestsOwnersId,
  filter,
}: {
  propertyId: string;
  roleId: 'OWNER';
  guestsOwnersId: string;
  filter: CalendarFilter;
}) => {
  const { isLoading, data, error } = useGetBookingsQuery({
    propertyId,
    roleId,
    guestsOwnersId,
    filter,
  });

  if (!data || data.length === 0) {
    const copy = {
      UPCOMING: 'You have no upcoming bookings',
      ALL: 'You have no bookings',
    };

    return (
      <div className="flex h-24 items-center justify-center text-center text-sm text-gray-400">
        {copy[filter]}
      </div>
    );
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

          const { first_name, last_name } = guests_owners.profiles;

          return (
            <BookingListItem
              key={id}
              id={id}
              startDate={start_date}
              endDate={end_date}
              status={status}
              guestName={`${first_name} ${last_name}`}
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
