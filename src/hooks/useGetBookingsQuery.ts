import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

const useGetBookingsQuery = ({
  propertyId,
  guestsOwnersId,
  roleId,
  filter,
}: {
  propertyId: string;
  roleId: 'OWNER' | 'GUEST';
  guestsOwnersId: string;
  filter: 'ALL' | 'UPCOMING' | 'CANCELED';
}) => {
  const supabaseClient = useSupabaseClient();

  const fetchBookings = async () => {
    console.log('fetchBookings', { propertyId, guestsOwnersId, roleId });

    if (roleId === 'OWNER') {
      // Get bookings for this property
      if (filter === 'ALL') {
        const { data, error } = await supabaseClient
          .from('bookings')
          .select(
            'id, start_date, end_date, status, guests_owners(id, role_id, profiles(id, first_name, last_name)), properties(id, name)'
          )
          .eq('property_id', propertyId)
          .order('start_date', { ascending: true });

        return data;
      } else if (filter === 'UPCOMING') {
        const { data, error } = await supabaseClient
          .from('bookings')
          .select(
            'id, start_date, end_date, status, guests_owners(id, role_id, profiles(id, first_name, last_name)), properties(id, name)'
          )
          .eq('status', 'BOOKED')
          .eq('property_id', propertyId)
          .gte('end_date', new Date().toISOString())
          .order('start_date', { ascending: true });

        return data;
      }
    } else {
      // Get only your own bookings
      const { data, error } = await supabaseClient
        .from('bookings')
        .select(
          'id, start_date, end_date, status, guests_owners(id, role_id, profiles(id, first_name, last_name)), properties(id, name)'
        )
        .eq('guests_owners_id', guestsOwnersId)
        .order('start_date', { ascending: true });

      return data;
    }

    // if (error) {
    //   throw new Error(error.message);
    // }

    // console.log({ data });

    // return [];
  };

  return useQuery({
    queryKey: ['bookings', propertyId, filter],
    queryFn: () => fetchBookings(),
  });
};

export default useGetBookingsQuery;
