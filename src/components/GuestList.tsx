import useDeleteGuestMutation from '@/hooks/useDeleteGuestMutation';
import useGetGuestsQuery from '@/hooks/useGetGuestsQuery';

interface Props {
  propertyId: string;
}

const DeleteButton: React.FC<{
  children: React.ReactNode;
  propertyId: string;
  guestId: string;
}> = ({ children, propertyId, guestId }) => {
  const mutation = useDeleteGuestMutation({ propertyId, guestId });

  return (
    <button
      onClick={() => {
        mutation.mutate(propertyId);
      }}
    >
      {mutation.isLoading ? 'Loading' : children}
    </button>
  );
};

const GuestList: React.FC<Props> = ({ propertyId }) => {
  const { isLoading, data, error } = useGetGuestsQuery({ propertyId });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  if (data.length === 0) {
    return <p>No guests have been invited yet</p>;
  }

  return (
    <table border={1} cellPadding={10}>
      <thead>
        <tr>
          <th>Email</th>
          <th>User account status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
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
            <td>{guest.profiles.email}</td>
            <td>{guest.profiles.last_sign_in_at ? 'Active' : 'Invite sent'}</td>
            <td>
              <DeleteButton propertyId={propertyId} guestId={guest.id}>
                Delete
              </DeleteButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GuestList;
