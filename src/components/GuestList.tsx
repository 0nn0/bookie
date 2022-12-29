import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Props {
  propertyId: string;
}

const DeleteButton: React.FC<{
  children: React.ReactNode;
  propertyId: string;
  guestId: string;
}> = ({ children, propertyId, guestId }) => {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (propertyId: string) => {
      // delete guest
      const { data, error } = await supabase
        .from('guests_owners')
        .delete()
        .eq('id', guestId);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests', propertyId] });
    },
  });

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
  const user = useUser();
  const supabase = useSupabaseClient();

  const fetchGuests = async () => {
    console.log({ propertyId });
    const { data, error } = await supabase
      .from('guests_owners')
      .select('id, role, profiles(id, email, last_sign_in_at)')
      .eq('property_id', propertyId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['guests', propertyId],
    queryFn: fetchGuests,
  });

  // exclude yourself from the list
  const filteredGuests =
    (data && data.filter((guest) => guest.profiles.id !== user.id)) || [];

  if (filteredGuests.length === 0) {
    return <p>No guests have been invite yet</p>;
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
        {isError && (
          <tr>
            <td colSpan={3}>Error: {error.message}</td>
          </tr>
        )}
        {data &&
          filteredGuests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.profiles.email}</td>
              <td>
                {guest.profiles.last_sign_in_at ? 'Active' : 'Invite sent'}
              </td>
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
