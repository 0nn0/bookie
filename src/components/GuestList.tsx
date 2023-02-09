import useDeleteGuestMutation from '@/hooks/useDeleteGuestMutation';
import useGetGuestsQuery from '@/hooks/useGetGuestsQuery';

import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import LoadingState from './LoadingState';

const DeleteButton = ({
  children,
  propertyId,
  guestId,
}: {
  children: React.ReactNode;
  propertyId: string;
  guestId: string;
}) => {
  const mutation = useDeleteGuestMutation({ propertyId, guestId });

  return (
    <button
      disabled={mutation.isLoading}
      className="text-red-600 hover:text-red-900"
      onClick={() => {
        mutation.mutate(propertyId);
      }}
    >
      {mutation.isLoading ? 'Loading' : children}
    </button>
  );
};

const GuestList = ({ propertyId }: { propertyId: string }) => {
  const { isLoading, data, error } = useGetGuestsQuery({ propertyId });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error instanceof Error) {
    return <ErrorState>Error: {error.message}</ErrorState>;
  }

  if (data.length === 0) {
    return <EmptyState>No guests have been invited yet</EmptyState>;
  }

  return (
    <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Name
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Role
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Edit</span>
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
          {data.map((guest) => (
            <tr key={guest.id}>
              <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                {guest.profiles.firstName} {guest.profiles.lastName}
                <dl className="font-normal lg:hidden">
                  <dd className="mt-1 truncate text-gray-700">
                    {guest.profiles.firstName} {guest.profiles.lastName}
                  </dd>
                  <dt className="sr-only sm:hidden">Email</dt>
                  <dd className="mt-1 truncate text-gray-500 sm:hidden">
                    {guest.profiles.email}
                  </dd>
                </dl>
              </td>

              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                {guest.profiles.email}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">Guest</td>
              <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <DeleteButton propertyId={propertyId} guestId={guest.id}>
                  Delete
                </DeleteButton>
                {/* <a href="#" className="text-red-600 hover:text-red-800">
                  Delete
                </a> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestList;
