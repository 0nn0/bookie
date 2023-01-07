import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

const useGetBookingsQuery = ({
  propertyId,
  guestsOwnersId,
  roleId,
}: {
  propertyId: string;
  roleId: 'OWNER' | 'GUEST';
  guestsOwnersId: string;
}) => {
  const supabaseClient = useSupabaseClient();

  const fetchBookings = async () => {
    console.log('fetchBookings', { propertyId, guestsOwnersId, roleId });
    // const { data: dataRole, error: errorRole } = await supabaseClient
    //   .from('guests_owners')
    //   .select('id, role_id')
    //   .eq('property_id', propertyId)
    //   .eq('profile_id', user?.id)
    //   .single();

    // console.log({
    //   dataRole,
    //   errorRole,
    // });

    if (roleId === 'OWNER') {
      // Get all bookings for this property
      const { data, error } = await supabaseClient
        .from('bookings')
        .select(
          'id, start_date, end_date, guests_owners(id, role_id, profiles(id, first_name, last_name))'
        )
        .eq('property_id', propertyId);

      return data;
    } else {
      // Get only your own bookings
      const { data, error } = await supabaseClient
        .from('bookings')
        .select(
          'id, start_date, end_date, guests_owners(id, role_id, profiles(id, first_name, last_name))'
        )
        .eq('guests_owners_id', guestsOwnersId);

      return data;
    }

    // if (error) {
    //   throw new Error(error.message);
    // }

    // console.log({ data });

    // return [];
  };

  return useQuery({
    queryKey: ['bookings', propertyId],
    queryFn: () => fetchBookings(),
  });
};

export default useGetBookingsQuery;
