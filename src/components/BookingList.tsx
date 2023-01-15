import useCancelBookingMutation from '@/hooks/useCancelBookingMutation';
import useGetBookingsQuery from '@/hooks/useGetBookingsQuery';

const CancelButton: React.FC<{
  children: React.ReactNode;
  bookingId: string;
}> = ({ children, bookingId }) => {
  const mutation = useCancelBookingMutation();

  return (
    <>
      <button
        onClick={() => {
          mutation.mutate(bookingId);
        }}
      >
        {mutation.isLoading || mutation.isSuccess ? 'Loading' : children}
      </button>
    </>
  );
};

const BookingList = ({
  propertyId,
  roleId,
  guestsOwnersId,
  filter,
}: {
  propertyId: string;
  roleId: 'OWNER';
  guestsOwnersId: string;
  filter: 'UPCOMING' | 'CANCELED' | 'ALL';
}) => {
  const { isLoading, data, error } = useGetBookingsQuery({
    propertyId,
    roleId,
    guestsOwnersId,
    filter,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data || data.length === 0) {
    const copy = {
      UPCOMING: 'You have no upcoming bookings',
      CANCELED: 'You have no canceled bookings',
      ALL: 'You have no bookings',
    };

    return <div>{copy[filter]}</div>;
  }

  return (
    <table border={1} cellPadding={10}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Start date</th>
          <th>End date</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const { id, start_date, end_date, status, guests_owners } = item;
          const { first_name, last_name } = guests_owners.profiles;

          return (
            <tr key={id}>
              <td>
                {first_name} {last_name}
              </td>
              <td>{start_date}</td>
              <td>{end_date}</td>
              <td>{guests_owners.role_id}</td>
              <td>{status}</td>
              <td>
                <CancelButton bookingId={id}>Cancel</CancelButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookingList;
