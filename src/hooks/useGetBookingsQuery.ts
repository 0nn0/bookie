import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

import { CalendarFilter } from '@/pages/properties/[id]/calendar';

const useGetBookingsQuery = ({
  propertyId,
  guestsOwnersId,
  roleId,
  filter,
}: {
  propertyId: string;
  roleId: 'OWNER' | 'GUEST';
  guestsOwnersId: string;
  filter: CalendarFilter;
}) => {
  const supabaseClient = useSupabaseClient();

  const fetchBookings = async () => {
    if (roleId === 'OWNER') {
      // Get bookings for this property
      if (filter === 'ALL') {
        return await supabaseClient
          .from('bookings')
          .select(
            'id, start_date, end_date, status, guests_owners(id, role_id, profiles(id, first_name, last_name)), properties(id, name)'
          )
          .eq('property_id', propertyId)
          .order('start_date', { ascending: true })
          .throwOnError();
      } else if (filter === 'UPCOMING') {
        return await supabaseClient
          .from('bookings')
          .select(
            'id, start_date, end_date, status, guests_owners(id, role_id, profiles(id, first_name, last_name)), properties(id, name)'
          )
          .eq('status', 'BOOKED')
          .eq('property_id', propertyId)
          .gte('end_date', new Date().toISOString())
          .order('start_date', { ascending: true })
          .throwOnError();
      }
    } else {
      // Get only your own bookings
      return await supabaseClient
        .from('bookings')
        .select(
          'id, start_date, end_date, status, guests_owners(id, role_id, profiles(id, first_name, last_name)), properties(id, name)'
        )
        .eq('guests_owners_id', guestsOwnersId)
        .order('start_date', { ascending: true })
        .throwOnError();
    }
  };

  return useQuery({
    queryKey: ['bookings', propertyId, filter],
    queryFn: async () => {
      return await fetchBookings().then((result) => result.data);
    },
  });
};

export default useGetBookingsQuery;
