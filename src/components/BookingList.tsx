import useCancelBookingMutation from '@/hooks/useCancelBookingMutation';
import useGetBookingsQuery from '@/hooks/useGetBookingsQuery';

const CancelButton = ({
  children,
  bookingId,
}: {
  children: React.ReactNode;
  bookingId: string;
}) => {
  const mutation = useCancelBookingMutation();

  return (
    <button
      className="text-red-600 hover:text-red-900"
      onClick={() => {
        mutation.mutate(bookingId);
      }}
    >
      {mutation.isLoading || mutation.isSuccess ? 'Loading' : children}
    </button>
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

  if (!data || data.length === 0) {
    const copy = {
      UPCOMING: 'You have no upcoming bookings',
      CANCELED: 'You have no canceled bookings',
      ALL: 'You have no bookings',
    };

    return <div>{copy[filter]}</div>;
  }

  return (
    <div className="mt-8 overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Start date
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              End date
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Status
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Cancel</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {isLoading && (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          )}
          {error instanceof Error && (
            <tr>
              <td colSpan={3}>Error: {error.message}</td>
            </tr>
          )}
          {data.map((item) => {
            const { id, start_date, end_date, status, guests_owners } = item;
            const { first_name, last_name } = guests_owners.profiles;

            return (
              <tr key={id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {start_date}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {end_date}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {first_name} {last_name}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {status === 'BOOKED' && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Booked
                    </span>
                  )}
                  {status === 'CANCELED' && (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      Canceled
                    </span>
                  )}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  {status === 'BOOKED' && (
                    <CancelButton bookingId={id}>Cancel</CancelButton>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
